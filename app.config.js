import "dotenv/config";

module.exports = {
  expo: {
    name: "Fanphil",
    slug: "Fanphil",
    deeplinks: ["Fanphil://"],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "Fanphil",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    jsEngine: "hermes",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.x0xzeke.Fanphil",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.x0xzeke.Fanphil",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-sqlite",
        {
          enableFTS: true,
          useSQLCipher: true,
          android: {
            enableFTS: false,
            useSQLCipher: false,
          },
          ios: {
            customBuildFlags: [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
            ],
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow FanphilPOS to access your photos",
          cameraPermission: "Allow FanphilPOS to access your camera",
        },
      ],
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      router: {
        origin: false,
      },
      eas: {
        projectId: "5c96bda5-a9d5-46b5-84a4-76e821cf9775",
      },
    },
  },
};
