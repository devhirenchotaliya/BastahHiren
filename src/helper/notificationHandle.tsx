import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { screenName } from "./constants";
import { navigationRef } from "../navigations/MainNavigator";
import {
  getAsyncNotifiactionData,
  setAsyncNotifiactionData,
} from "./asyncStorage";
import { Platform } from "react-native";
import { order_status } from "./globalFunctions";

export const onNotificationPress = () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log("remote Message KILL state", remoteMessage);
        navigateToOrderDetails(remoteMessage);
      }
    });
};

export const onBackgroundNotificationPress = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage) {
      navigateToOrderDetails(remoteMessage);
    }
    console.log(
      "Notification caused app to open from BACKGROUND state:",
      remoteMessage.notification
    );
  });
};

export const onMessage = () => {
  if (Platform.OS === "android") {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived! ACTIVE APP", remoteMessage);
      setAsyncNotifiactionData(remoteMessage?.data);
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }
};

export const onMessageReceived = (remoteMessage: any) => {
  setAsyncNotifiactionData(remoteMessage?.data);
  onDisplayNotification(remoteMessage);
};

async function onDisplayNotification(message: any) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });
  notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId,
      pressAction: {
        id: "default",
        launchActivity: "default",
      },
    },
  });
}

export const navigateToOrderDetails = (remoteMessage: any) => {
  if (remoteMessage?.data?.order_id) {
    console.log("remoteMessage?.data", remoteMessage?.data);
    let order_id = remoteMessage?.data?.order_id;
    let status = remoteMessage?.data?.status;
    setTimeout(() => {
      if (status === order_status.delivered) {
        // @ts-ignore
        navigationRef.current?.navigate(screenName.add_review, {
          order_id,
        });
      } else {
        // @ts-ignore
        navigationRef.current?.navigate(screenName.order_details, { order_id });
      }
    }, 300);
  }
};

export const openAppNotifiactionEvent = async () => {
  return notifee.onForegroundEvent(async ({ type, detail }) => {
    let orderData = await getAsyncNotifiactionData();
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        setAsyncNotifiactionData(null);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
        // for ios only
        if (detail.notification?.data?.order_id) {
          if (detail.notification?.data?.status === order_status.delivered) {
            //@ts-ignore
            navigationRef.current?.navigate(screenName.add_review, {
              order_id: detail.notification?.data?.order_id,
            });
          } else {
            //@ts-ignore
            navigationRef.current?.navigate(screenName.order_details, {
              order_id: detail.notification?.data?.order_id,
            });
          }
        }
        // foe android only
        if (orderData?.order_id) {
          if (orderData?.status === order_status.delivered) {
            //@ts-ignore
            navigationRef.current?.navigate(screenName.add_review, {
              order_id: orderData?.order_id,
            });
          } else {
            //@ts-ignore
            navigationRef.current?.navigate(screenName.order_details, {
              order_id: orderData?.order_id,
            });
          }
        }
        setAsyncNotifiactionData(null);
        break;
    }
  });
};
