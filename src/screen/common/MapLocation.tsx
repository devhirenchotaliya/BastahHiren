import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { colors } from "../../theme/Colors";
import { RouterProps } from "../../helper/types";

import {
  wp,
  hp,
  getText,
  hitSlop,
  infoToast,
  isNotchDevice,
} from "../../helper/globalFunctions";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps

import { PrimaryButton } from "../../components";
import { string } from "../../i18n/locales/en";
import { icons } from "../../theme/Icons";
import {
  SafeAreaView as SafeEdge,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { GOOGLE_API_KEY } from "../../helper/apiConstants";
import { useAppDispatch } from "../../redux/hooks";
import { getGoogleMapAddress } from "../../actions";
import { requestLocationPermission } from "../../helper/loactionHandler";

const BackButton = ({ onPressBack }: any) => {
  return (
    <SafeAreaView style={styles.backIconStyle}>
      <TouchableOpacity
        style={styles.backCircleStyle}
        onPress={onPressBack}
        hitSlop={hitSlop}
      >
        <Image
          resizeMode="contain"
          style={styles.iconStyle}
          source={icons.backWhite}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

type regionProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
let region: regionProps = {
  latitude: 25.2048,
  longitude: 55.2708,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

const MapLocation = ({ navigation, route }: RouterProps) => {
  const { top } = useSafeAreaInsets();

  // @ts-ignore
  const { getSeletedLocation } = route?.params;
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [position, setPostion] = useState(region);

  const onPressBack = () => navigation.goBack();
  const onPressConfirmAddress = () => {
    let obj = {
      position: position,
      formatted_address: searchInput,
    };
    getSeletedLocation(obj);
    navigation.goBack();
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      await requestLocationPermission(
        (response) => {
          console.log("response location", response);
          getAddress(response);
        },
        (err) => {
          console.log("err", err);
        }
      );
    };
    getCurrentLocation();
  }, []);

  const getAddress = (res: any) => {
    let obj = {
      params: {
        latlng: `${res?.latitude},${res?.longitude}`,
        key: GOOGLE_API_KEY,
      },
      onSuccess: (response: any) => {
        setPostion(res);
        if (response?.results?.length) {
          setSearchInput(response?.results?.[0]?.formatted_address);
        }
      },
      onFailure: () => {},
    };
    dispatch(getGoogleMapAddress(obj));
  };

  const getPosition = (place_id: string) => {
    let obj = {
      params: {
        place_id: place_id,
        fields: "geometry",
        key: GOOGLE_API_KEY,
      },
      onSuccess: (response: any) => {
        if (response?.results?.length) {
          setPostion({
            latitude: response?.results?.[0]?.geometry?.location?.lat,
            longitude: response?.results?.[0]?.geometry?.location?.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        }
      },
      onFailure: () => {},
    };
    dispatch(getGoogleMapAddress(obj));
  };

  return (
    <SafeEdge edges={[]} style={styles.container}>
      <MapView
        loadingEnabled={true}
        loadingBackgroundColor={colors.white}
        loadingIndicatorColor={colors.grey}
        onRegionChangeComplete={getAddress}
        style={styles.map}
        region={position}
      >
        {/* <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          /> */}
      </MapView>
      <View pointerEvents="none" style={styles.markerStyle}>
        <Image
          resizeMode="contain"
          style={styles.markerIconStyle}
          source={icons.locationMarker}
        />
      </View>

      <BackButton onPressBack={onPressBack} />

      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="always"
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          container: {
            ...styles.autoContainer,
            marginTop: Platform.OS === "ios" ? top + hp(40) : top + hp(60),
          },
          description: styles.description,
        }}
        textInputProps={{
          autoCorrect: false,
          numberOfLines: 1,
          value: searchInput,
          onChangeText: (text) => {
            setSearchInput(text);
          },
          style: styles.inputStyle,
          placeholderTextColor: colors.whiteGray,
        }}
        placeholder="Search your address"
        onPress={(data) => {
          console.log("data", data);
          // 'details' is provided when fetchDetails = true
          setSearchInput(data.description);
          getPosition(data?.place_id);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          // components: "country:ae",
        }}
        onFail={(error) => {
          infoToast(error);
        }}
      />

      <PrimaryButton
        onPress={onPressConfirmAddress}
        containerStyle={styles.buttonStyle}
        label={getText(string.my_address.confirm_address)}
      />
    </SafeEdge>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonStyle: {
    width: "90%",
    position: "absolute",
    alignSelf: "center",
    bottom: isNotchDevice ? hp(16) : hp(20),
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  backIconStyle: {
    left: wp(16),
    position: "absolute",
    top: isNotchDevice ? hp(16) : hp(20),
  },
  iconStyle: {
    height: wp(18),
    width: wp(18),
    marginRight: wp(3),
    marginTop: hp(3),
  },
  backCircleStyle: {
    height: wp(30),
    width: wp(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(30 / 2),
    backgroundColor: colors.grey,
  },
  inputStyle: {
    flex: 1,
    height: hp(55),
    borderWidth: 1,
    marginBottom: hp(5),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: wp(10),
    paddingHorizontal: wp(20),
    backgroundColor: colors.white,
    borderColor: colors.borderGreyLight,
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  autoContainer: {
    width: "90%",
    position: "absolute",
    alignSelf: "center",
    marginHorizontal: wp(20),
    // marginTop: isNotchDevice ? hp(100) : hp(60),
  },
  description: {
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
  },
  markerStyle: {
    position: "absolute",
    top: "50%",
    bottom: "50%",
    alignSelf: "center",
    marginTop: -hp(30),
  },
  markerIconStyle: {
    height: wp(30),
    width: wp(30),
  },
});

export default MapLocation;
