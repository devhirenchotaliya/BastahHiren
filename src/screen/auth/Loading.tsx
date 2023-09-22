import React, { useEffect } from "react";
import { ImageBackground, Platform, StyleSheet } from "react-native";
import { colors } from "../../theme/Colors";
import { screenName } from "../../helper/constants";
import {
  getAsyncFcmToken,
  getAsyncIsGuestUser,
} from "../../helper/asyncStorage";
import {
  screen_width,
  screen_height,
  dispatchNavigation,
} from "../../helper/globalFunctions";
import { getProfile, guestUserLogin } from "../../actions";
import { useAppDispatch } from "../../redux/hooks";
import { images } from "../../theme/Icons";
import {
  onMessage,
  onNotificationPress,
  openAppNotifiactionEvent,
  onBackgroundNotificationPress,
} from "../../helper/notificationHandle";
import { getUniqueId } from "react-native-device-info";

const Loading = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserInfo();
    onMessage();
    onNotificationPress();
    onBackgroundNotificationPress();
    openAppNotifiactionEvent();
  }, []);

  const getUserInfo = async () => {
    let isGuest = await getAsyncIsGuestUser();
    let deviceToken = await getAsyncFcmToken();
    let uniqueId = await getUniqueId();
    if (isGuest) {
      let data = new FormData();
      data.append("deviceToken", deviceToken || uniqueId);
      const obj = {
        data,
        onSuccess: () => {
          dispatchNavigation(screenName.bottom_tab_navigator);
        },
        onFailure: () => {
          dispatchNavigation(screenName.sign_in);
        },
      };
      dispatch(guestUserLogin(obj));
    } else {
      dispatch(getProfile());
      dispatchNavigation(screenName.bottom_tab_navigator);
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={images.launchScreen}
      imageStyle={styles.imageStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  imageStyle: {
    height: screen_height,
    width: screen_width,
  },
});

export default Loading;
