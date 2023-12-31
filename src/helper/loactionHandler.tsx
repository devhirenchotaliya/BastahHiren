import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

export const requestLocationPermission = async (
  onSucess: (res: any) => void,
  onFail: (err: any) => void
) => {
  if (Platform.OS === "ios") {
    getCurrentPosition(
      (data) => {
        if (onSucess) onSucess(data);
      },
      (error) => {
        if (onFail) onFail(error);
        _openAppSetting();
      }
    );
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // @ts-ignore
        {
          title: "Location Access Required",
          message: "This App needs to Access your location",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loactionEnabler(
          (isEnabled) => {
            if (isEnabled) {
              getCurrentPosition(
                (data) => {
                  if (onSucess) onSucess(data);
                },
                (error) => {
                  if (onFail) onFail(error);
                }
              );
            }
          },
          (err) => {
            if (onFail) onFail(err);
            loactionOffModal();
          }
        );
      } else {
        _openAppSetting();
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const getCurrentPosition = async (
  onSucess: (res: any) => void,
  onFail: (err: any) => void
) => {
  Geolocation.getCurrentPosition(
    async (pos) => {
      const crd = pos.coords;
      let position = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      if (onSucess) onSucess(position);
    },
    (error) => {
      if (onFail) onFail(error);
    },
    {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    }
  );
};

export const loactionEnabler = (
  onSucess?: (res: any) => void,
  onFail?: (err: any) => void
) => {
  if (Platform.OS === "android") {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((res) => {
        if (onSucess) onSucess(true);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      })
      .catch((err) => {
        if (onFail) onFail(err);
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  }
};

export const _openAppSetting = () => {
  Alert.alert(
    "Location Permission",
    "Please allow app to access your location",
    [
      {
        text: "Setting",
        onPress: () => Linking.openSettings(),
      },
      {
        text: "cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]
  );
};

export const loactionOffModal = () => {
  Alert.alert("Location Permission", "Please turn on location services", [
    {
      text: "Ok",
      onPress: () => {
        loactionEnabler();
      },
    },
  ]);
};
