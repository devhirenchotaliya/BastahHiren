import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import { getText, hp, infoToast, wp } from "../../helper/globalFunctions";

import {
  AuthHeader,
  CartItem,
  CartRowItem,
  DropdownComponent,
  Input,
  PhoneInput,
  PrimaryButton,
  RemoveModal,
  SecondaryInput,
} from "../../components";
import { RouterProps } from "../../helper/types";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fontFamily, screenName } from "../../helper/constants";
import { commonFontStyle } from "../../theme/Fonts";
import { getCart, getCities, updateCart } from "../../actions";
import { emailCheck } from "../../helper/validation";

const GuestCheckout = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { cartItemData } = useAppSelector((state) => state.shopping);
  const { citiesList } = useAppSelector((state) => state.common);

  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<object>({});
  const [emirate, setEmirate] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isRemoveItemModal, setIsRemoveItems] = useState<boolean>(false);
  const [removeItem, setRemoveItem] = useState<any>({});
  const [autoFocusPhoneInput, setAutoFocusPhoneInput] =
    useState<boolean>(false);

  const areaRef = useRef(null);
  const addressRef = useRef(null);
  const apartmentRef = useRef(null);
  const fisrtRef = useRef(null);
  const lastRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    dispatch(getCities());
  }, []);

  const onPresMapIcon = () => {
    navigation.navigate(screenName.map_location, {
      // formatted_address , position
      getSeletedLocation: (res: any) => {
        setLocation(res?.formatted_address);
        setPosition(res?.position);
      },
    });
  };

  const onPressCountinue = () => {
    if (location?.trim()?.length === 0) {
      infoToast("Please select your location");
    } else if (emirate?.trim()?.length === 0) {
      infoToast("Please select your Emirate");
    } else if (area?.trim()?.length === 0) {
      infoToast("Please enter your area");
    } else if (deliveryAddress?.trim()?.length === 0) {
      infoToast("Please enter your delivery address");
    } else if (apartment?.trim()?.length === 0) {
      infoToast("Please enter your Apartment/Hotel Room/Villa");
    } else if (firstName?.trim()?.length === 0) {
      infoToast("Please enter your fisrt name");
    } else if (lastName?.trim()?.length === 0) {
      infoToast("Please enter your last name");
    } else if (email.trim().length === 0) {
      infoToast("Please enter your email address");
    } else if (!emailCheck(email)) {
      infoToast("Please enter your valid email address");
    } else if (phoneNumber.trim().length === 0) {
      infoToast("Please enter your phone number");
    } else if (phoneNumber.trim().length !== 9) {
      infoToast("Please enter valid phone number");
    } else if (Object.keys(cartItemData)?.length === 0) {
      infoToast("Your cart is empty. Please add item");
    } else {
      let obj = {
        order_by: "guest",
        lat: position?.latitude,
        lng: position?.longitude,
        emirate: emirate,
        area: area,
        delivery_address: deliveryAddress,
        apt_villa_no: apartment,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: "971" + phoneNumber,
      };
      navigation.navigate(screenName.checkout_payment, { orderData: obj });
    }
  };

  const onPressAddRemoveItem = (item: any, count: number) => {
    let data = new FormData();
    data.append("item_id", item?.item_id);
    data.append("quantity", count);
    console.log("data", data);

    let obj = {
      data,
      onSuccess: () => {
        dispatch(getCart(() => {}, true));
      },
      onFailure: () => {},
    };
    dispatch(updateCart(obj));
  };

  const onPressRemoveItem = (item: any, count: number) => {
    setIsRemoveItems(true);
    setRemoveItem({ item, count: 0 });
  };

  const onPressYesItem = () => {
    setIsRemoveItems(false);
    onPressAddRemoveItem(removeItem?.item, 0);
  };

  const onPressCancelItem = () => {
    setIsRemoveItems(false);
    setRemoveItem({});
  };

  const ListFooterComponent = () => {
    return (
      <View style={{}}>
        <CartRowItem
          title={getText(string.cart.subtotal)}
          value={"AED " + (cartItemData?.subTotal || 0)}
        />
        <CartRowItem
          title={getText(string.cart.delivery)}
          value={
            cartItemData?.deliveryCharges > 0
              ? "AED " + (cartItemData?.deliveryCharges || 0)
              : "Standard - Fee"
          }
        />
        <CartRowItem
          title={getText(string.cart.vat) + cartItemData?.vat + "%"}
          value={"AED " + (cartItemData?.vatAmount || 0)}
        />
        <View style={{ height: hp(18) }} />
        <View style={styles.totalContainer}>
          <CartRowItem
            value={"AED " + (cartItemData?.grandTotal || 0)}
            title={getText(string.cart.total)}
            font_family={fontFamily.semiBold}
          />
          <CartRowItem
            value={cartItemData?.estimated_delivery}
            textStyle={styles.textStyle}
            title={getText(string.cart.estimated_delivery_date)}
          />
          <View style={{ height: hp(150) }} />
        </View>
      </View>
    );
  };

  const country = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.check_out.check_out)} />
      <KeyboardAwareScrollView
        bounces={false}
        extraScrollHeight={hp(100)}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.marginStyle}>
          <Text style={styles.locationLabelTextStyle}>
            {getText(string.guest_checkout.location)}
          </Text>
          <SecondaryInput
            theme={"map"}
            editable={false}
            value={location}
            onChangeText={setLocation}
            onPressMapIcon={onPresMapIcon}
            placeholder={getText(string.my_address.map_location)}
          />
          <DropdownComponent
            placeholder="Dubai"
            data={citiesList}
            value={emirate}
            setValue={setEmirate}
            label={getText(string.guest_checkout.emirate)}
          />
          {/* <Input
            theme="secondary"
            value={emirate}
            placeholder="Dubai"
            onChangeText={(t: string) => setEmirate(t)}
            label={getText(string.guest_checkout.emirate)}
          /> */}
          <Input
            value={area}
            theme="secondary"
            inputRef={areaRef}
            returnKeyType="next"
            placeholder="Al Bursha"
            onChangeText={(t: string) => setArea(t)}
            label={getText(string.guest_checkout.area)}
            onSubmitEditing={() => addressRef?.current?.focus()}
          />
          <Input
            theme="secondary"
            inputRef={addressRef}
            returnKeyType="next"
            value={deliveryAddress}
            placeholder="87 b 2 Square,Rwpd,"
            onChangeText={(t: string) => setDeliveryAddress(t)}
            label={getText(string.guest_checkout.delivery_address)}
            onSubmitEditing={() => apartmentRef?.current?.focus()}
          />
          <Input
            theme="secondary"
            value={apartment}
            inputRef={apartmentRef}
            returnKeyType="next"
            placeholder="Royal Tower"
            onChangeText={(t: string) => setApartment(t)}
            label={getText(string.guest_checkout.apartment_hotel_villa)}
            onSubmitEditing={() => fisrtRef?.current?.focus()}
          />
          <Input
            theme="secondary"
            value={firstName}
            inputRef={fisrtRef}
            returnKeyType="next"
            placeholder="Williams"
            onChangeText={(t: string) => setFirstName(t)}
            label={getText(string.guest_checkout.first_name)}
            onSubmitEditing={() => lastRef?.current?.focus()}
          />
          <Input
            theme="secondary"
            value={lastName}
            inputRef={lastRef}
            returnKeyType="next"
            placeholder="David"
            onChangeText={(t: string) => setLastName(t)}
            label={getText(string.guest_checkout.last_name)}
            onSubmitEditing={() => emailRef?.current?.focus()}
          />
          <Input
            theme="secondary"
            value={email}
            inputRef={emailRef}
            returnKeyType="next"
            placeholder="williams@david.com"
            onChangeText={(t: string) => setEmail(t)}
            label={getText(string.guest_checkout.email)}
            onSubmitEditing={() => setAutoFocusPhoneInput(true)}
          />
          <Text style={styles.phoneLabelTextStyle}>
            {getText(string.guest_checkout.phone_number)}
          </Text>
          <PhoneInput
            value={phoneNumber}
            autoFocus={autoFocusPhoneInput}
            returnKeyType="next"
            countryCode="+971"
            onChangeText={(t: string) => setPhoneNumber(t)}
            onSubmitEditing={() => Keyboard.dismiss()}
            inputStyle={{
              ...commonFontStyle(fontFamily.regular, 18, colors.primary),
            }}
          />
          <PrimaryButton
            onPress={onPressCountinue}
            label={getText(string.guest_checkout.continue)}
            containerStyle={styles.buttonContainer}
          />
          <Text style={styles.labelTextStyle}>
            {getText(string.guest_checkout.order_summary)}
          </Text>
        </View>
        <FlatList
          scrollEnabled={true}
          data={cartItemData?.cartItems || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <CartItem
                key={index}
                data={item}
                onPressRemoveItem={() => onPressRemoveItem(item, 0)}
                onUpdateQuantity={(count) => onPressAddRemoveItem(item, count)}
              />
            );
          }}
          ListFooterComponent={() => {
            if (Object.keys(cartItemData)?.length > 0) {
              return ListFooterComponent();
            } else {
              return null;
            }
          }}
        />
      </KeyboardAwareScrollView>
      <RemoveModal
        onPressYes={onPressYesItem}
        isVisible={isRemoveItemModal}
        onPressCancel={onPressCancelItem}
        title={getText(string.cart.revome_items)}
        question={getText(string.cart.revome_items_sub_text)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  marginStyle: {
    paddingHorizontal: wp(20),
  },
  locationLabelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginBottom: -hp(10),
    marginTop: hp(20),
  },
  phoneLabelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginTop: hp(25),
    marginBottom: hp(10),
  },
  buttonContainer: {
    marginVertical: hp(35),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
  },
  totalContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGreyLight,
    borderTopColor: colors.borderGreyLight,
  },
  textStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.grey6),
  },
});

export default GuestCheckout;
