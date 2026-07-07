import { Image, type ImageSource } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const MAX_SCALE = 4;
const MIN_SCALE = 1;

type ZoomableImageProps = {
  source: ImageSource | number;
  width: number;
  height: number;
};

/**
 * A page image that can be pinch-zoomed (two fingers) and double-tap-reset back to fit.
 * Deliberately doesn't add single-finger pan-while-zoomed: that gesture would compete with
 * the horizontal FlatList's single-finger page-swipe in the parent viewer, and composing the
 * two reliably needs on-device tuning this environment can't do. Pinch/double-tap are safe
 * because they use touch counts and timing that a single-finger swipe never satisfies.
 */
export function ZoomableImage({ source, width, height }: ZoomableImageProps) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.min(Math.max(savedScale.value * event.scale, MIN_SCALE), MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value === 1) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withTiming(1);
      savedScale.value = 1;
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  const gesture = Gesture.Simultaneous(pinch, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[{ width, height }, animatedStyle]}>
        <Image source={source} style={{ width, height }} contentFit="contain" />
      </Animated.View>
    </GestureDetector>
  );
}
