import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
} from "react-native";
import { colors } from "../../theme/Colors";

import { IconButtonProps, RouterProps } from "../../helper/types";
import {
  AuthHeader,
  DropdownComponent,
  PrimaryButton,
  SecondaryInput,
} from "../../components";
import { getText, hp, infoToast, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addAddress, getAddress, getCities } from "../../actions";

const IconButton = ({
  icon,
  label,
  containerStyle,
  onPress,
  isSelected,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.buttonContainer,
        backgroundColor: isSelected ? colors.primary : colors.white,
        ...containerStyle,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          ...styles.iconStyle,
          tintColor: isSelected ? colors.white : colors.primary,
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          ...styles.buttonLabelTextStyle,
          color: isSelected ? colors.white : colors.primary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const NewAddress = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { citiesList } = useAppSelector((state) => state.common);

  const [label, setLabel] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<object>({});
  const [phone, setPhone] = useState<string>("");
  const [houseNo, setHouseNo] = useState<string>("");
  const [building, setBuilding] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [landMark, setLandMark] = useState<string>("");
  const [nickNameAddress, setNickNameAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cityFocus, setCityFocus] = useState<boolean>(false);

  const phoneRef = useRef(null);
  const houesRef = useRef(null);
  const buildingRef = useRef(null);
  const areaRef = useRef(null);
  const landMarkRef = useRef(null);
  const nickNameAddressRef = useRef(null);

  useEffect(() => {
    dispatch(getCities());
  }, []);

  const onSavePress = () => {
    if (label?.length === 0) {
      infoToast("Please select any label. (Home/Office/Appartment)");
    } else if (location.trim().length === 0) {
      infoToast("Please select your location");
    } else if (city.trim().length === 0) {
      infoToast("Please enter your city");
    } else if (phone.trim().length === 0) {
      infoToast("Please enter your phone number");
    } else if (phone.trim().length !== 9) {
      infoToast("Please enter valid phone number");
    } else if (houseNo.trim().length === 0) {
      infoToast("Please enter your House no./Fat no.");
    } else if (building.trim().length === 0) {
      infoToast("Please enter your Building/ Premise Name");
    } else if (area.trim().length === 0) {
      infoToast("Please enter your Area/Street");
    } else {
      let data = new FormData();
      data.append("address_type", label);
      data.append("lat", position?.latitude);
      data.append("lng", position?.longitude);
      data.append("address", location);
      data.append("phone", "+971" + phone);
      data.append("house_no", houseNo);
      data.append("building", building);
      data.append("street", area);
      data.append("landmark", landMark);
      data.append("address_nickname", nickNameAddress);
      data.append("city", city);
      data.append("is_default", 1);
      let obj = {
        data,
        onSuccess: () => {
          dispatch(getAddress());
          navigation.goBack();
        },
        onFailure: () => {},
      };
      dispatch(addAddress(obj));
    }
  };

  const onPresMapIcon = () => {
    navigation.navigate(screenName.map_location, {
      // formatted_address , position
      getSeletedLocation: (res: any) => {
        setLocation(res?.formatted_address);
        setPosition(res?.position);
      },
    });
  };
  const onPressAddressLabel = (label: string) => setLabel(label);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.my_address.new_address)} />
      <KeyboardAwareScrollView
        bounces={false}
        extraScrollHeight={hp(100)}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.innerContainer}
      >
        <View>
          <Text style={styles.titleTextStyle}>
            {getText(string.my_address.your_complete_address)}
          </Text>
          <View style={styles.rowStyle}>
            <IconButton
              icon={icons.homeBlack}
              isSelected={label === "Home"}
              label={getText(string.my_address.home)}
              onPress={() => onPressAddressLabel("Home")}
            />
            <IconButton
              icon={icons.office}
              isSelected={label === "Office"}
              label={getText(string.my_address.office)}
              onPress={() => onPressAddressLabel("Office")}
              containerStyle={{ marginHorizontal: wp(8) }}
            />
            <IconButton
              icon={icons.appartment}
              isSelected={label === "Apartment"}
              label={getText(string.my_address.appartment)}
              onPress={() => onPressAddressLabel("Apartment")}
            />
          </View>
          <SecondaryInput
            theme={"map"}
            editable={false}
            value={location}
            onChangeText={setLocation}
            onPressMapIcon={onPresMapIcon}
            placeholder={getText(string.my_address.map_location)}
          />
          <DropdownComponent
            placeholder={getText(string.my_address.city)}
            data={citiesList}
            value={city}
            setValue={setCity}
            onFocus={() => setCityFocus(true)}
            onBlur={() => setCityFocus(false)}
            containerStyle={{
              marginTop: hp(20),
            }}
          />
          <SecondaryInput
            ref={phoneRef}
            maxLength={9}
            value={phone}
            returnKeyType="next"
            onChangeText={setPhone}
            keyboardType="number-pad"
            placeholder={getText(string.my_address.phone_number)}
            onSubmitEditing={() => houesRef?.current?.focus()}
          />
          <SecondaryInput
            ref={houesRef}
            value={houseNo}
            returnKeyType="next"
            onChangeText={setHouseNo}
            keyboardType="numbers-and-punctuation"
            placeholder={getText(string.my_address.house_no)}
            onSubmitEditing={() => buildingRef?.current?.focus()}
          />
          <SecondaryInput
            returnKeyType="next"
            ref={buildingRef}
            value={building}
            onChangeText={setBuilding}
            placeholder={getText(string.my_address.building)}
            onSubmitEditing={() => areaRef?.current?.focus()}
          />
          <SecondaryInput
            returnKeyType="next"
            value={area}
            ref={areaRef}
            onChangeText={setArea}
            placeholder={getText(string.my_address.area)}
            onSubmitEditing={() => landMarkRef?.current?.focus()}
          />
          <SecondaryInput
            ref={landMarkRef}
            returnKeyType="next"
            value={landMark}
            onChangeText={setLandMark}
            placeholder={getText(string.my_address.landmark)}
            onSubmitEditing={() => nickNameAddressRef?.current?.focus()}
          />
          <SecondaryInput
            ref={nickNameAddressRef}
            returnKeyType="next"
            value={nickNameAddress}
            onChangeText={setNickNameAddress}
            placeholder={getText(string.my_address.nickname_for_address)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <PrimaryButton
            onPress={onSavePress}
            containerStyle={styles.buttonStyle}
            label={getText(string.my_address.save)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flexGrow: 1,
    paddingTop: hp(16),
    paddingHorizontal: wp(16),
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
    marginTop: hp(5),
  },
  buttonContainer: {
    width: wp(106),
    height: hp(45),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(25),
    borderWidth: 1.5,
    paddingHorizontal: wp(20),
    justifyContent: "center",
    borderColor: colors.primary,
  },
  iconStyle: {
    height: wp(21),
    width: wp(21),
  },
  buttonLabelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
    marginLeft: wp(10),
  },
  rowStyle: {
    flexDirection: "row",
    marginVertical: hp(20),
    alignSelf: "center",
  },
  buttonStyle: {
    marginVertical: hp(35),
  },
});

export default NewAddress;
