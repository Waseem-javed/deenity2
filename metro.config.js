const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@": path.resolve(__dirname, "src"),
  "@assets": path.resolve(__dirname, "assets"),
  "@components": path.resolve(__dirname, "src/components"),
  "@types": path.resolve(__dirname, "src/types"),
  "@constants": path.resolve(__dirname, "src/constants"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
