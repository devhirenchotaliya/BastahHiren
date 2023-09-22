import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/Colors";
import {
  AuthHeader,
  CartItem,
  CartRowItem,
  PrimaryButton,
  RemoveModal,
} from "../../components";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { RouterProps, RowItemProps } from "../../helper/types";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { emptyCart, getCart, updateCart } from "../../actions";
import { useFocusEffect } from "@react-navigation/native";

const MyShopping = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { cartItemData } = useAppSelector((state) => state.shopping);
  const { userInfo } = useAppSelector((state) => state.common);

  const [isData, setIsData] = useState<boolean>(false);
  const [isRemoveItemModal, setIsRemoveItems] = useState<boolean>(false);
  const [isRemoveCart, setIsRemoveCart] = useState<boolean>(false);
  const [removeItem, setRemoveItem] = useState<any>({});
  const [noDataText, setNoDataText] = useState("");

  useFocusEffect(
    useCallback(() => {
      getCartItemList();
    }, [])
  );

  const getCartItemList = () => {
    setNoDataText("");
    dispatch(
      getCart((data) => {
        if (data?.length === 0) {
          setNoDataText(getText(string.cart.your_bag_is_empty));
          setIsData(false);
        } else {
          setNoDataText("");
          setIsData(true);
        }
      })
    );
  };

  const onPlaceOrderPress = () => {
    if (userInfo?.isGuest) {
      navigation.navigate(screenName.sign_in, { isGuestCheckout: true });
    } else {
      navigation.navigate(screenName.checkout_add_address);
    }
  };

  const ListFooterComponent = () => {
    return (
      <View>
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
          <View style={{ height: hp(18) }} />
        </View>
        <PrimaryButton
          onPress={onPlaceOrderPress}
          label={getText(string.cart.place_order)}
          containerStyle={styles.buttonContainer}
        />
      </View>
    );
  };

  const onPressAddRemoveItem = (item: any, count: number) => {
    console.log("item", item);
    console.log("count", count);

    let data = new FormData();
    data.append("item_id", item?.item_id);
    data.append("quantity", count);

    let obj = {
      data,
      onSuccess: () => getCartItemList(),
      onFailure: () => {},
    };
    dispatch(updateCart(obj));
  };

  const onPressDeleteCart = () => {
    let obj = {
      onSuccess: () => {
        setNoDataText(getText(string.cart.your_bag_is_empty));
        setIsData(false);
      },
    };
    dispatch(emptyCart(obj));
  };

  // All cart

  const onPressYesCart = () => {
    setIsRemoveCart(false);
    onPressDeleteCart();
  };

  const onPressCancelCart = () => {
    setIsRemoveCart(false);
  };

  //items

  const onPressYesItem = () => {
    setIsRemoveItems(false);
    onPressAddRemoveItem(removeItem?.item, 0);
  };

  const onPressCancelItem = () => {
    setIsRemoveItems(false);
    setRemoveItem({});
  };

  const onPressRemoveItem = (item: any, count: number) => {
    setIsRemoveItems(true);
    setRemoveItem({ item, count: 0 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        title={getText(string.cart.my_cart)}
        onPressDelete={() => setIsRemoveCart(true)}
        isDeleteIcon={cartItemData?.cartItems?.length > 0 ? true : false}
      />
      {isData === false ? (
        <View style={styles.innerContainer}>
          <Text style={styles.centerTextStyle}>{noDataText}</Text>
        </View>
      ) : (
        <FlatList
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
      )}
      <RemoveModal
        onPressYes={onPressYesItem}
        isVisible={isRemoveItemModal}
        onPressCancel={onPressCancelItem}
        title={getText(string.cart.revome_items)}
        question={getText(string.cart.revome_items_sub_text)}
      />
      <RemoveModal
        isVisible={isRemoveCart}
        onPressYes={onPressYesCart}
        onPressCancel={onPressCancelCart}
        title={getText(string.cart.revome_cart)}
        question={getText(string.cart.revome_cart_sub_text)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  rowItemTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  rowItemContainer: {
    marginTop: hp(18),
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(22),
    justifyContent: "space-between",
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
  buttonContainer: {
    marginVertical: hp(30),
    marginHorizontal: wp(16),
  },
  centerTextStyle: {
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
  },
});

export default MyShopping;
