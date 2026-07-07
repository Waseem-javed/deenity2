import type { ReactNode } from "react";
import type { ViewProps } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

type ScreenContainerProps = ViewProps & {
  children: ReactNode;
  className?: string;
  /** Which sides to pad for the device's safe area. Screens rendered under a tab bar
   * shouldn't add a bottom inset themselves, since the tab bar already accounts for it. */
  edges?: Edge[];
};

export function ScreenContainer({ children, className, edges = ["top", "left", "right"], ...props }: ScreenContainerProps) {
  return (
    <SafeAreaView
      edges={edges}
      className={className ? ["flex-1 bg-slate-50 dark:bg-slate-950 px-4", className].join(" ") : "flex-1 bg-slate-50 dark:bg-slate-950 px-6 py-6"}
      style={props.style}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
