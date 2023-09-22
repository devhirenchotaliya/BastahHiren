import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import { RouterProps } from "../../helper/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthHeader, PrimaryButton, RatingView } from "../../components";
import {
  fontSize,
  getText,
  hp,
  infoToast,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getOrderDetails, rateOrder } from "../../actions";
import FastImage from "react-native-fast-image";
import { getFormData } from "../../helper/globalFunctions";

const AddReview = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const [orderItems, setOrderItems] = useState([]);
  const { orderItemDetails } = useAppSelector((state) => state.order);

  useEffect(() => {
    let params = {
      order_id: route?.params?.order_id,
    };
    const onSuccess = (response: any) => {
      setOrderItems(response?.order_items);
    };
    dispatch(getOrderDetails(params, onSuccess));
  }, []);

  const onPressSubmitReview = () => {
    let ratingItems = orderItems?.filter((i: any) => i.rating > 0);
    let error = orderItems?.filter(
      (item: any) =>
        (item?.rating > 0 && item?.comment === undefined) ||
        item?.comment?.length <= 50
    );
    if (ratingItems?.length === 0) {
      infoToast("Please rate your product");
    } else if (error?.length > 0) {
      infoToast("Please enter your feedback at least 50 characters");
    } else {
      let finalObj = {};
      ratingItems.map((item: any, index: number) => {
        let obj = {
          [`item_ids[${index}]`]: item?.id,
          [`rates[${index}]`]: item?.rating,
          [`comments[${index}]`]: item?.comment,
        };
        Object.assign(finalObj, obj);
      });
      let passData = { ...finalObj, order_id: orderItemDetails?.id };
      let obj = {
        data: getFormData(passData),
        onSuccess: () => {
          navigation.goBack();
        },
        onFailure: () => {},
      };
      dispatch(rateOrder(obj));
    }
  };

  const onPressStarItem = (starIndex: number, index: number) => {
    orderItems[index].rating = starIndex;
    setOrderItems([...orderItems]);
  };

  const onChangeItemComment = (text: string, index: number) => {
    orderItems[index].comment = text;
    setOrderItems([...orderItems]);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader
        borderBottomWidth={0}
        title={getText(string.add_review.add_review)}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.innerContainer}
      >
        <FlatList
          scrollEnabled={false}
          keyboardShouldPersistTaps={"handled"}
          data={orderItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.mainItemContainer}>
                <View style={styles.itemContainer}>
                  <FastImage
                    resizeMode="cover"
                    style={styles.imgStyle}
                    source={{
                      uri: item?.image,
                      priority: FastImage.priority.normal,
                    }}
                  />
                  <View style={styles.rightContainer}>
                    <Text style={styles.brandNameTextStyle}>
                      {item?.seller?.store_name}
                    </Text>
                    <Text numberOfLines={2} style={styles.descTextStyle}>
                      {item?.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.greyTextStyle}>
                    {getText(
                      string.add_review.your_overall_rating_of_this_product
                    )}
                  </Text>
                  <RatingView
                    rating={item?.rating}
                    onStarPress={(starIndex) =>
                      onPressStarItem(starIndex + 1, index)
                    }
                  />
                </View>
                <Text style={styles.inputLabelStyle}>
                  {getText(string.add_review.what_did_you_like_or_dislike)}
                </Text>
                {(item?.rating > 0 && item?.comment === undefined) ||
                item?.comment?.length < 50 ? (
                  <Text style={styles.errorMsgTextStyle}>
                    {"Please enter your feedback at least 50 characters"}
                  </Text>
                ) : (
                  <Text style={styles.errorMsgTextStyle}></Text>
                )}

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={getText(
                      string.add_review.what_should_shoppers_know_before
                    )}
                    multiline={true}
                    value={item?.comment}
                    style={styles.inputStyle}
                    onChangeText={(text) => onChangeItemComment(text, index)}
                  />
                </View>
              </View>
            );
          }}
        />
      </KeyboardAwareScrollView>
      <PrimaryButton
        label={getText(string.add_review.submit_reviews)}
        onPress={onPressSubmitReview}
        containerStyle={styles.buttonStyle}
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
    paddingHorizontal: wp(22),
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(12),
  },
  imgStyle: {
    height: hp(120),
    width: wp(120),
    borderRadius: wp(10),
    backgroundColor: colors.inputBack,
  },
  rightContainer: {
    flex: 1,
    marginLeft: wp(20),
  },
  brandNameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 19, colors.grey),
  },
  descTextStyle: {
    ...commonFontStyle(fontFamily.semiBold, 18, colors.primary),
    lineHeight: fontSize(35),
    marginTop: hp(20),
  },
  ratingContainer: {
    padding: wp(14),
    paddingVertical: hp(23),
    borderTopWidth: 0.5,
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginVertical: hp(20),
    marginHorizontal: wp(5),
    borderTopColor: colors.borderGrey,
    borderBottomColor: colors.borderGrey,
  },
  greyTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.priceGrey),
    marginBottom: hp(15),
  },
  inputLabelStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.black),
    marginTop: hp(20),
    marginHorizontal: wp(5),
  },
  errorMsgTextStyle: {
    ...commonFontStyle(fontFamily.regular, 14, colors.red),
    marginTop: hp(5),
    marginHorizontal: wp(5),
    marginBottom: hp(10),
  },
  inputStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
    padding: 0,
    textAlignVertical: "top",
  },
  inputContainer: {
    height: hp(125),
    padding: wp(20),
    borderRadius: wp(10),
    // marginTop: hp(20),
    marginHorizontal: wp(5),
    backgroundColor: colors.whiteGrey2,
  },
  buttonStyle: {
    marginHorizontal: wp(18),
  },
  mainItemContainer: {
    paddingBottom: hp(10),
    borderBottomWidth: 1.5,
    borderColor: colors.borderGreyLight,
  },
});

export default AddReview;
