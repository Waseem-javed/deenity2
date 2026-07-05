import { useAudioPlayer } from "expo-audio";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

const FULL_ADHAN = require("../../assets/audio/azan.mp3");

export function AdhanPlayer() {
  const player = useAudioPlayer(FULL_ADHAN);

  useEffect(() => {
    function playFromStart() {
      player.pause();
      player.seekTo(0).then(() => player.play());
    }

    function isAdhanNotification(data: unknown) {
      return Boolean(data && typeof data === "object" && "prayer" in data);
    }

    const receivedSub = Notifications.addNotificationReceivedListener((notification) => {
      if (isAdhanNotification(notification.request.content.data)) playFromStart();
    });
    const responseSub = Notifications.addNotificationResponseReceivedListener((response) => {
      if (isAdhanNotification(response.notification.request.content.data)) playFromStart();
    });

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, [player]);

  return null;
}
