import { Dimensions, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { navigationRef } from "../navigations/MainNavigator";
import { CommonActions } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import Toast from "react-native-toast-message";
import { ImagePickerProps } from "./types";
import DeviceInfo from "react-native-device-info";
import { icons } from "../theme/Icons";

export const screen_width: number = Dimensions.get("window").width;
export const screen_height: number = Dimensions.get("window").height;

export const wp = (val: number) => {
  return widthPercentageToDP((val * 100) / 375);
};

export const hp = (val: number) => {
  return heightPercentageToDP((val * 100) / 812);
};

export const isIos = Platform.OS === "ios";

export const isNotchDevice = DeviceInfo.hasNotch();

export const fontSize = (val: number) => RFValue(val, 812);

export const getText = (text: string) => {
  return text;
};

export const dispatchNavigation = (name: string) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: name }],
    })
  );
};

export const hitSlop = {
  top: hp(10),
  bottom: hp(10),
  left: wp(10),
  right: wp(10),
};

export const openImagePicker = ({
  params,
  onSucess,
  onFail,
}: ImagePickerProps) => {
  try {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      mediaType: "photo",
      ...params,
    })
      .then((image) => {
        let obj = {
          ...image,
          uri: image.path,
          name: "image_" + moment().unix() + "_" + image.path.split("/").pop(),
        };
        onSucess(obj);
      })
      .catch((err) => {
        onFail?.(err);
      });
  } catch (error) {}
};

export const infoToast = (message: string) => {
  Toast.show({ type: "info", text1: message });
};
export const errorToast = (message: string) => {
  Toast.show({ type: "error", text1: message });
};

export const otpToast = (message: string) => {
  Toast.show({ type: "otp_success", text1: message });
};

export const successToast = (message: string) => {
  Toast.show({ type: "success", text1: message });
};

export function formatPhoneNumber(input: string) {
  // Remove all non-digit characters from the input
  const digitsOnly = input?.replace(/\D/g, "");

  // // Check if the input is a valid phone number
  // if (digitsOnly.length !== 9) {
  //   return "Invalid phone number";
  // }

  // Format the phone number
  const formattedNumber = digitsOnly.replace(
    /(\d{2})(\d{3})(\d{4})/,
    "$1-$2-$3"
  );

  return formattedNumber;
}

export const getPaymentMethodWiseIcon = (pay_method: string) => {
  switch (pay_method) {
    case "Cash":
      return icons.cash;
    case "Card":
      return icons.card;
    case "Apple Pay":
      return icons.applePay;
    case "Google Pay":
      return icons.googlePay;
    default:
      break;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case order_status.submitted:
      return "#C1A185";
    case order_status.cancelled:
      return "#E94E4E";
    case order_status.completed:
      return "#4FB87F";
    case order_status.fulfilled:
      return "#fcdd7e";
    case order_status.dispatched:
      return "#fa9b02";
    case order_status.confirmed:
      return "#1ce879";
    case order_status.delivered:
      return "#2e8a15";
    default:
      break;
  }
};

export const order_status = {
  submitted: "Submitted",
  cancelled: "Cancelled",
  fulfilled: "Fulfilled",
  completed: "Completed",
  dispatched: "Dispatched",
  confirmed: "Confirmed",
  delivered: "Delivered",
};

export function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object?.[key]));
  return formData;
}

export function arrayConvertFormData(data: any) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]: any) => {
    formData.append(Object.keys(value)?.[0], Object.values(value)?.[0]);
  });
  return formData;
}

export function getGuestUserAddress(data: any) {
  return `${data?.delivery_address || ""}, ${data?.apt_villa_no || ""},  ${
    data?.area || ""
  }, ${data?.area || ""}, ${data?.emirate || ""}`;
}

export function notifiactionTime(date: string) {
  if (moment(date).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")) {
    let diffr = moment.duration(moment().diff(moment(date)));
    var hours = Number(diffr.asHours());
    //@ts-ignore
    if (parseInt(hours) === 0) {
      //@ts-ignore
      var minutes = parseInt(diffr.minutes());
      //@ts-ignore
      if (parseInt(minutes) === 0) {
        //@ts-ignore
        var seconds = parseInt(diffr.seconds());
        //@ts-ignore
        return `${parseInt(seconds)}s`;
      }
      //@ts-ignore
      return `${parseInt(minutes)}m`;
    }
    //@ts-ignore
    return `${parseInt(hours)}h`;
  } else {
    var now = moment(); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    //@ts-ignore
    return `${parseInt(days)}d`;
    // return moment(date).fromNow(false);
  }
}
