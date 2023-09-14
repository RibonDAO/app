const version = "5.2.0";
const buildNumber = 335;

export default () => ({
  "expo": {
    "owner": "ribon-app",
    "name": "Ribon",
    "slug": "app",
    "version": version,
    "orientation": "portrait",
    "icon": "./src/assets/images/icon.png",
    "scheme": "ribon",
    "jsEngine": "hermes",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./src/assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "ribon",
            "project": "app",
            "authToken": process.env.REACT_APP_SENTRY_AUTH_TOKEN,
          }
        }
      ]
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/5f34ae47-0c00-49ae-9893-125f3bea2960"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "infoPlist": {
         "UIBackgroundModes": [
           "fetch",
           "remote-notification"
         ],
         "NSCameraUsageDescription": "This app requires access to your phone's camera."
      },
      "supportsTablet": true,
      "bundleIdentifier": "org.reactjs.native.example.Ribon",
      "buildNumber": buildNumber.toString(),
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/images/adaptive-icon.png",
        "backgroundColor": "#00DA93"
      },
      "package": "com.app.ribon",
      "versionCode": buildNumber,
    },
    "web": {
      "favicon": "./src/assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 33,
            "targetSdkVersion": 33,
            "buildToolsVersion": "33.0.0"
          },
          "ios": {
            "useFrameworks": "static",
            "deploymentTarget": "13.0"
          }
        }
      ],
      ["sentry-expo"],
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@react-native-firebase/crashlytics",
      [
        "@config-plugins/react-native-branch",
        {
          "apiKey": "key_live_psjoynwxXPk14LioRerHjhggEvgKd6Bh",
          "iosAppDomain": "donation.app.link"
        }
      ],
      [
        "@stripe/stripe-react-native",
        {
          "merchantIdentifier": "merchant.ribon.app",
          "enableGooglePay": true
        }
      ],
      [
        "customerio-expo-plugin",
        {
            android: {
              googleServicesFile: "./files/google-services.json"
            },
            ios: {
              pushNotification: {
                useRichPush: false,
                env: {
                    siteId: process.env.REACT_APP_CIO_SITE_ID,
                    apiKey: process.env.REACT_APP_CIO_API_KEY,
                    region: "us"
                 }
              }
            }
        }
      ],
    ],
    "extra": {
      "eas": {
        "projectId": "5f34ae47-0c00-49ae-9893-125f3bea2960"
      },
      "REACT_APP_RIBON_API": process.env.REACT_APP_RIBON_API,
      "REACT_APP_RIBON_INTEGRATION_ID": process.env.REACT_APP_RIBON_INTEGRATION_ID,
      "REACT_APP_MIXPANEL_TOKEN": process.env.REACT_APP_MIXPANEL_TOKEN,
      "REACT_APP_STRIPE_GLOBAL_PUBLISHABLE_KEY": process.env.REACT_APP_STRIPE_GLOBAL_PUBLISHABLE_KEY,
      "REACT_APP_STRIPE_PUBLISHABLE_KEY": process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
      "REACT_APP_CIO_SITE_ID": process.env.REACT_APP_CIO_SITE_ID,
      "REACT_APP_CIO_API_KEY": process.env.REACT_APP_CIO_API_KEY,
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "build": {
      "experimental": {
         "ios": {
            "appExtensions": [{
               "targetName": "NotificationService",
               "bundleIdentifier": "org.reactjs.native.example.Ribon.richpush",
            }],
         },
      },
   },
  }
});
