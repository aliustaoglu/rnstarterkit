Install react native cli globally.

```sh
npm install -g react-native-cli
```

Note that we install "react-native-cli" but use the command "react-native". Don't install react-native globally. 

I will use Genymotion as the emulator. There are other alternatives or you can use your Android device directly but it's faster to use an emulator. Download and install it from here:

https://www.genymotion.com

You need to create a personal account and login. Genymotion is free for personal projects but you need to purchase a subscription for commercial projects. Then add a virtual device using the plus button. I've added Google Pixel 2 on Android 8.0. But it does not matter much. And start the instance.

You need to create a personal account and login. Genymotion is free for personal projects but you need to purchase a subscription for commercial projects. Then add a virtual device using the plus button. I've added Google Pixel 2 on Android 8.0. But it does not matter much. And start the instance.

![Genymotion](https://cuneyt.aliustaoglu.biz/en/content/images/2019/01/image-1.png)

Now create a new project using:

```
react-native init my-rn-project

```

Add below scripts to package.json

```json
{
  "bundle-android": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && react-native run-android",
  "bundle-ios": "react-native bundle --dev false --entry-file index.js --bundle-output ios/main.jsbundle --platform ios",
  "postinstall": "rndebugger-open --port 8081"
}
```

If you run any of those scripts, it will fail. Because by default '/assets' folder under 'android/app/src/main' does not exist. Create this empty folder so when you run the script it will fail creating the file "index.android.bundle" under this folder.

![assets location](https://cuneyt.aliustaoglu.biz/en/content/images/2019/01/image.png)

Now run:

```sh
npm run bundle-android
```

If this fails, probably your ANDROID_HOME variable is not set. Find your Android SDK location and save it in environment variables. For me it was like below:

```sh
export ANDROID_HOME=/Users/cuneytaliustaoglu/Library/Android/sdk
```

If still fails with error code INSTALL_FAILED_VERIFICATION_FAILURE, run below that allows adb to install apps from unknown resources.

```sh
adb shell settings put global verifier_verify_adb_installs 0
adb shell settings put global package_verifier_enable 0
```

Now run below commands. But before running this make sure that GenyMotion is running a virtual Android image. Make sure npm install is run.

```sh
npm install
adb reverse tcp:8081 tcp:8081
react-native run-android
react-native start
```

Now we should be able to see "Welcome to React Native!" message. 

![Wellcome to React Native](https://cuneyt.aliustaoglu.biz/en/content/images/2019/01/image-2.png)

But we are not finished. We need to be able to debug this application.

Install react-native-debugger standalone application from below:

https://github.com/jhen0409/react-native-debugger

For Mac ```brew update && brew cask install react-native-debugger``` will install it using Brew. Or you can install it using the binaries.

Also install the npm package for this and save it as dev dependencies. This is needed to open the standalone react-native debugger from the emulator when we click "Remote JS Debugging".

https://github.com/jhen0409/react-native-debugger/tree/master/npm-package

```sh
npm i --save-dev react-native-debugger-open
```

Now add another script to package.json

```json
{
    "postinstall": "rndebugger-open --port 8081"
}
```

and run ```npm run postinstall```

Now on your Android Emulator shake or press menu button for dev menu and click "Debug JS Remotely". It will open React Native Debugger and you'll be able to put breakpoints. Below see the familiar debugger which comes with Redux Devtools. 

![React Native Debugger](https://cuneyt.aliustaoglu.biz/en/content/images/2019/01/image-5.png)

Access to your non transpiled code (ES6 code) under RNDebuggerWorker.js and put breakpoints. You can also enable hot reloading from the same menu.
