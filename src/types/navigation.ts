export type AppTabRoute = "home" | "explore" | "profile";

export interface AppTabItem {
  key: AppTabRoute;
  title: string;
  icon: "home" | "compass" | "account";
}
