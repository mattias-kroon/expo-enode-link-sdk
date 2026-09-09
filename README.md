# expo-enode-link-sdk

An Expo Module integration for Enode's Link SDK.

> **This is a fork** of [YoussefHenna/expo-enode-link-sdk](https://github.com/YoussefHenna/expo-enode-link-sdk),
> maintained so the bundled native Enode SDKs can be kept current and so the
> fixes ABRP previously carried as `patch-package` entries live in source.

## Bundled native SDK versions

The two platforms are versioned independently by Enode, so these numbers do not
track each other or this package's version.

| Platform | Enode SDK | Source |
| --- | --- | --- |
| iOS | **LinkKit 1.0.12** (build 28, min iOS 13.1) | `ios/Frameworks/LinkKit.xcframework`, committed binary from [enode/enode-link-ios](https://github.com/enode/enode-link-ios) tag `1.0.12` |
| Android | **io.enode:linkkit 1.0.8** | Maven Central, declared in `android/build.gradle` |

**To update iOS:** check out the desired tag of `enode/enode-link-ios`, replace
`ios/Frameworks/LinkKit.xcframework` wholesale, and diff the
`arm64-apple-ios.swiftinterface` inside it against the previous one to catch API
changes. Confirm the version afterwards with:

```sh
plutil -p ios/Frameworks/LinkKit.xcframework/ios-arm64/LinkKit.framework/Info.plist \
  | grep -E 'ShortVersion|MinimumOS'
```

`LinkKit.linkKitVersion()` reports the same string at runtime, which is the only
way to be sure of what actually shipped in a build.

**To update Android:** bump the `io.enode:linkkit` version in
`android/build.gradle`. Latest available versions are listed at
[repo1.maven.org/maven2/io/enode/linkkit](https://repo1.maven.org/maven2/io/enode/linkkit/).

## Android

The Enode SDK requires Android SDK version 34+ and the minimum SDK 24+. It is required to add this to your app's `app.json` under `plugins`.

```json
"plugins": [
  [
    "expo-build-properties",
    {
      "android": {
        "minSdkVersion": 24,
        "compileSdkVersion": 34,
        "targetSdkVersion": 34,
        "buildToolsVersion": "34.0.0"
      }
    }
  ],
  // your other plugins, if any
]
```

If not already installed, you'll also need to install `expo-build-properties`

```
npx expo install expo-build-properties
```

### App theme

Enode's link sdk uses the MaterialComponents android app theme, `expo-enode-link-sdk` provides an expo plugin for setting the android app theme. Add the following to your `app.json`

```json
"plugins": [
    [
        "@youssefhenna/expo-enode-link-sdk", "Theme.MaterialComponents.DayNight.NoActionBar"
    ]
]
```

## IOS

The enode SDK uses bluetooth and therefore you need to add this in your app's `app.json` under `ios`.

```json
"ios": {
  "infoPlist": {
    "NSBluetoothAlwaysUsageDescription": "Our app requires Bluetooth to connect with energy devices, enabling efficient device management and enhanced user experience."
  },
  // your other ios configuration, if any
}
```

Additionally the Enode SDK requires iOS deployment target 14+. It is required to add this to your app's `app.json` under `plugins`.

```json
"plugins": [
  [
    "expo-build-properties",
    {
      "ios": {
        "deploymentTarget": "14.0"
      }
    }
  ],
  // your other plugins, if any
]
```

This is the same plugin used in the Android config and not a seperate one. The final config of this plugin should look something like this:

```json
"plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 24,
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "buildToolsVersion": "34.0.0"
          },
          "ios": {
            "deploymentTarget": "14.0"
          }
        }
      ]
    ]
```

## Usage

Install the package

```
npx expo install @youssefhenna/expo-enode-link-sdk
```

Import the package

```ts
import * as ExpoEnodeLinkSDK from "@youssefhenna/expo-enode-link-sdk";
```

Listen to the result events by:

```tsx
React.useEffect(() => {
  const resultListener = ExpoEnodeLinkSDK.listenToResult(
    (code, errorMessage) => {
      // Add your code here to handle the result
    },
  );
  return () => resultListener.remove();
}, []);
```

Launch/Show the Enode Link UI

```ts
ExpoEnodeLinkSDK.show("<YOUR_TOKEN_HERE>");
```
