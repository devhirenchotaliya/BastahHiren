import messaging from "@react-native-firebase/messaging";
import { infoToast } from "./globalFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncKeys, getAsyncFcmToken } from "./asyncStorage";
import { PermissionsAndroid, Platform } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLINET_ID } from "./apiConstants";
import appleAuth from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { getUniqueId } from "react-native-device-info";

export async function requestNotificationUserPermission() {
  if (Platform.OS === "android") {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }
  const authStatus = await messaging().requestPermission();
  let uniqueId = await getUniqueId();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    if (authStatus === 1) {
      if (Platform.OS === "ios") {
        await messaging()
          .registerDeviceForRemoteMessages()
          .then(async () => {
            getFirebaseToken();
          })
          .catch(() => {
            getFirebaseToken();
          });
      } else {
        getFirebaseToken();
      }
    } else {
      await messaging().requestPermission();
      AsyncStorage.setItem(asyncKeys.fcm_token, uniqueId);
    }
  } else {
    await messaging().requestPermission();
    AsyncStorage.setItem(asyncKeys.fcm_token, uniqueId);
    infoToast("Please allow to notifications permission");
  }
}

const getFirebaseToken = async () => {
  let uniqueId = await getUniqueId();
  await messaging()
    .getToken()
    .then((fcmToken) => {
      if (fcmToken) {
        console.log("---fcmToken---", fcmToken);
        AsyncStorage.setItem(asyncKeys.fcm_token, fcmToken);
        infoToast(fcmToken.toString());
      } else {
        infoToast("[FCMService] User does not have a device token");
        AsyncStorage.setItem(asyncKeys.fcm_token, uniqueId);
      }
    })
    .catch((error) => {
      let err = `FCm token get error${error}`;
      AsyncStorage.setItem(asyncKeys.fcm_token, uniqueId);
      infoToast(error);
      console.log(err);
    });
};

export const onGoogleLogin = async (onSucess: (res: any) => void) => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLINET_ID,
  });
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("GoogleSignin userInfo", userInfo);
    if (onSucess) onSucess(userInfo);
  } catch (error: any) {
    console.log("error", error);
    if (error?.code === statusCodes?.SIGN_IN_CANCELLED) {
      infoToast("user cancelled the login flow");
    } else if (error?.code === statusCodes?.IN_PROGRESS) {
      infoToast("operation (e.g. sign in) is in progress already");
      // operation (e.g. sign in) is in progress already
    } else if (error?.code === statusCodes?.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      infoToast("play services not available or outdated");
    } else {
      // some other error happened
      infoToast("Something went wrong, please try again");
    }
  }
};

export async function onAppleLogin() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    infoToast("Apple Sign-In failed - no identify token returned");
    throw "Apple Sign-In failed - no identify token returned";
  }

  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );
  return auth().signInWithCredential(appleCredential);
}

export const formDataAppleLogin = async (response: any) => {
  let deviceToken = await getAsyncFcmToken();
  let uniqueId = await getUniqueId();
  var str = response.user.email;
  str = str?.split("@");
  let data = new FormData();
  data.append("name", str?.[0]);
  data.append("email", response.user.email);
  data.append("appleId", response.user.uid);
  data.append("deviceToken", deviceToken || uniqueId);
  return data;
};

export const formDataGoogleLogin = async (response: any) => {
  let deviceToken = await getAsyncFcmToken();
  let uniqueId = await getUniqueId();
  const { name, email, id } = response?.user;
  let data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("googleId", id);
  data.append("deviceToken", deviceToken || uniqueId);
  return data;
};
