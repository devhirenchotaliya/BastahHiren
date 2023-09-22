import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import {
  fontSize,
  getText,
  hitSlop,
  hp,
  infoToast,
  wp,
} from "../../helper/globalFunctions";

import {
  AuthHeader,
  CarouselView,
  ColorsItem,
  PrimaryButton,
  QuantityManager,
  RatingAndReviewsItem,
  RecentlyViewItem,
  SizeItem,
} from "../../components";
import { RouterProps } from "../../helper/types";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { string } from "../../i18n/locales/en";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addRemoveFavourite,
  addToCart,
  clearSellerProfile,
  getItemDetails,
} from "../../actions";
import {
  getGuestFavoriteData,
  setGuestFavoriteData,
} from "../../helper/asyncStorage";

const ItemDetails = ({ navigation }: RouterProps) => {
  const scrollRef = useRef<null>(null);
  const dispatch = useAppDispatch();
  const { itemDetails } = useAppSelector((state) => state.home);
  const { isFavouriteLoading, userInfo } = useAppSelector(
    (state) => state.common
  );

  const [selectedSize, setSelectedSize] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(itemDetails?.item?.price);

  const onBackPress = () => navigation.goBack();

  const onHeartPress = async () => {
    // if (userInfo?.isGuest) {
    //   let guestFavorite = await getGuestFavoriteData();
    //   if (guestFavorite === null) {
    //     setGuestFavoriteData([itemDetails?.item]);
    //   } else {
    //     let newData = [itemDetails?.item, ...guestFavorite];
    //     var newarray = newData.filter(
    //       (o, i) => newData.findIndex((obj) => obj.id == o.id) == i
    //     );
    //     setGuestFavoriteData(newarray);
    //   }
    // } else {
    let data = new FormData();
    data.append("item_id", itemDetails?.item?.id);
    let obj = {
      data,
      onSuccess: () => {
        let params = { item_id: itemDetails?.item?.id };
        dispatch(getItemDetails(params, true));
      },
      onFailure: () => {},
    };
    dispatch(addRemoveFavourite(obj));
    // }
  };

  const onPressRecommendedItem = (item: any) => {
    let params = { item_id: item?.id };
    dispatch(getItemDetails(params));
    setTimeout(() => {
      // @ts-ignore
      scrollRef?.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, 300);
  };

  const onPressSeller = () => {
    dispatch(clearSellerProfile());
    navigation.navigate(screenName.seller_profile, {
      seller_id: itemDetails?.item?.seller_id,
    });
  };

  const onScroll = (event: any) => {
    const scrolling = event.nativeEvent.contentOffset.y;
    if (scrolling > 422) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  let sizeData: any[] =
    itemDetails?.item?.options?.filter((i: any) => i?.title === "Size")?.[0]
      ?.option || [];

  let colorData: any[] =
    itemDetails?.item?.options?.filter((i: any) => i?.title === "Color")?.[0]
      ?.option || [];

  const onSizeItemPress = (index: number) => setSelectedSize(index);
  const onColorItemPress = (index: number) => {
    setSelectedColor(index);
    setPrice(colorData?.[index]?.price || itemDetails?.item?.price);
  };

  const onAddToCartPress = () => {
    if (sizeData?.length > 0 && selectedSize === undefined) {
      infoToast("Please select a size");
    } else if (colorData?.length > 0 && selectedColor === undefined) {
      infoToast("Please select a color");
    } else {
      let data = new FormData();
      data.append("item_id", itemDetails?.item?.id);
      data.append("quantity", quantity);
      if (selectedSize !== undefined && selectedColor !== undefined) {
        let options = [
          { size: sizeData?.[selectedSize]?.value },
          {
            color: colorData?.[selectedColor]?.value,
            price: colorData?.[selectedColor]?.price,
          },
        ];
        data.append("options", JSON.stringify(options));
      } else if (selectedSize !== undefined) {
        let sizeOption = [{ size: sizeData?.[selectedSize]?.value }];
        data.append("options", JSON.stringify(sizeOption));
      } else if (selectedColor !== undefined) {
        let colorOption = [
          {
            color: colorData?.[selectedColor]?.value,
            price: colorData?.[selectedColor]?.price,
          },
        ];
        data.append("options", JSON.stringify(colorOption));
      }
      let obj = {
        data,
        onSuccess: () => {
          navigation.navigate(screenName.tabBarName.my_shopping);
        },
        onFailure: () => {},
      };
      dispatch(addToCart(obj));
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader
        isHeartIcon
        borderBottomWidth={0}
        onPressHeart={onHeartPress}
        title={itemDetails?.item?.title}
        isHeartLoading={isFavouriteLoading}
        icon={
          itemDetails?.item?.is_favourite === 1
            ? icons.heartSelected
            : icons.heart
        }
      />
      <ScrollView
        // onScroll={onScroll}
        scrollEventThrottle={16}
        // stickyHeaderIndices={[1]}
        style={styles.container}
        ref={scrollRef}
      >
        <CarouselView
          // onPressBack={onBackPress}
          // onPressHeart={onHeartPress}
          data={itemDetails?.item?.images}
          // isHeartLoading={isFavouriteLoading}
          // is_favourite={itemDetails?.item?.is_favourite}
        />
        <View
          style={
            isSticky
              ? {
                  paddingTop: isSticky ? useSafeAreaInsets().top + hp(7) : 0,
                  paddingBottom: isSticky ? hp(10) : 0,
                  ...styles.stickyHeaderStyle,
                }
              : styles.stickyHeaderStyle
          }
        >
          <View style={styles.rowStyle}>
            {isSticky ? (
              <TouchableOpacity hitSlop={hitSlop} onPress={onBackPress}>
                <Image
                  resizeMode="contain"
                  source={icons.backArrow}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            ) : null}
            <Text style={styles.nameTextStyle}>{itemDetails?.item?.title}</Text>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.rowSpaceStyle}>
            <Text style={styles.amountTextStyle}>
              {"AED "}
              {price}
            </Text>
            {itemDetails?.item?.ratings?.length > 0 ? (
              <View style={styles.rowStyle}>
                <Image
                  resizeMode="contain"
                  source={icons.star}
                  style={styles.starIconStyle}
                />
                <Text style={styles.starCountTextStyle}>
                  {itemDetails?.item?.avg_rate}
                </Text>
                <Text
                  style={{ ...styles.amountTextStyle, fontSize: fontSize(20) }}
                >
                  {`(${itemDetails?.item?.total_rate})`}
                </Text>
              </View>
            ) : null}
          </View>
          {sizeData?.length ? (
            <Text style={styles.nameTextStyle}>
              {getText(string.details.sizes)}
            </Text>
          ) : null}

          <FlatList
            numColumns={4}
            data={sizeData}
            scrollEnabled={false}
            keyExtractor={(item) => "_" + item}
            renderItem={({ item, index }) => {
              return (
                <SizeItem
                  key={index}
                  index={index}
                  data={item}
                  selected={selectedSize}
                  containerStyle={{ marginRight: wp(10) }}
                  onPressItem={() => onSizeItemPress(index)}
                />
              );
            }}
          />
          <Text style={styles.nameTextStyle}>
            {getText(string.details.quantity)}
          </Text>
          <QuantityManager
            minQuantity={1}
            quantity={quantity}
            setQuantity={(value) => setQuantity(value)}
          />
          {colorData?.length ? (
            <Text style={styles.nameTextStyle}>
              {getText(string.details.choose_color)}
            </Text>
          ) : null}

          <View style={styles.colorsRowStyle}>
            {colorData.map((item: any, index: number) => {
              return (
                <ColorsItem
                  key={index}
                  data={item}
                  index={index}
                  selectedColor={selectedColor}
                  onPress={() => onColorItemPress(index)}
                />
              );
            })}
          </View>
          <Text style={{ ...styles.nameTextStyle, marginTop: hp(10) }}>
            {getText(string.details.descrition)}
          </Text>
          <Text style={styles.descritionTextStyle}>
            {itemDetails?.item?.description}
          </Text>
          <Text style={styles.sellerTextStyle}>
            {getText(string.details.seller_information)}
          </Text>
          <TouchableOpacity
            onPress={onPressSeller}
            style={{
              ...styles.rowStyle,
              marginVertical: hp(12),
              alignItems: "flex-start",
            }}
          >
            <Image
              resizeMode="cover"
              source={{
                uri: itemDetails?.item?.seller?.picture,
              }}
              style={styles.sellerImgStyle}
            />
            <View style={{ flex: 1, marginHorizontal: wp(15) }}>
              <Text numberOfLines={1} style={{ ...styles.soldByTextStyle }}>
                {"Sold by"}{" "}
                <Text style={{ color: colors.primary }}>
                  {itemDetails?.item?.seller?.store_name}
                </Text>
              </Text>
              <Text
                style={{
                  ...styles.soldByTextStyle,
                  color: colors.primary,
                  marginTop: hp(3),
                }}
              >
                {"Store"}
              </Text>
            </View>
            <View style={styles.rowStyle}>
              <Image
                resizeMode="contain"
                source={icons.star}
                style={styles.starIconStyle}
              />
              <Text
                style={{
                  ...styles.starCountTextStyle,
                  fontSize: fontSize(18),
                }}
              >
                {itemDetails?.item?.seller?.avg_rate}
              </Text>
              <Text
                style={{
                  ...styles.amountTextStyle,
                  fontSize: fontSize(18),
                }}
              >
                {`(${itemDetails?.item?.seller?.total_rate})`}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ ...styles.rowSpaceStyle, marginTop: 0 }}>
            <Text style={styles.sellerTextStyle}>
              {getText(string.details.rating_and_reviews)}
            </Text>
          </View>

          <FlatList
            scrollEnabled={false}
            data={itemDetails?.item?.ratings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <RatingAndReviewsItem key={index} data={item} />;
            }}
          />

          {itemDetails?.similar_items?.length ? (
            <Text
              style={{
                ...styles.nameTextStyle,
                marginVertical: hp(10),
                marginBottom: hp(20),
              }}
            >
              {getText(string.details.recommended_items)}
            </Text>
          ) : null}

          <FlatList
            numColumns={2}
            data={itemDetails?.similar_items}
            renderItem={({ item, index }) => {
              return (
                <RecentlyViewItem
                  key={index}
                  data={item}
                  isScreenApiCall={true}
                  containerStyle={{ marginRight: 0 }}
                  onPressScreenItem={() => onPressRecommendedItem(item)}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapperStyle}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <PrimaryButton
        containerStyle={styles.buttonStyle}
        onPress={onAddToCartPress}
        label={getText(string.details.add_to_cart)}
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
    marginHorizontal: wp(17),
    marginBottom: hp(16),
  },
  nameTextStyle: {
    marginVertical: hp(5),
    ...commonFontStyle(fontFamily.semiBold, 20, colors.primary),
  },
  rowSpaceStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(7),
    alignItems: "center",
    marginBottom: hp(13),
  },
  amountTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.grey),
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIconStyle: {
    height: hp(21),
    width: wp(21),
  },
  starCountTextStyle: {
    marginLeft: wp(7),
    marginHorizontal: wp(5),
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  colorsRowStyle: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  descritionTextStyle: {
    ...commonFontStyle(fontFamily.extraLight, 18, colors.gery5),
    lineHeight: fontSize(35),
    marginVertical: hp(10),
  },
  sellerTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.primary),
    marginVertical: hp(10),
    marginTop: hp(15),
  },
  sellerImgStyle: {
    height: hp(65),
    width: hp(65),
    borderRadius: hp(65 / 2),
    backgroundColor: colors.inputBack,
  },
  soldByTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.grey),
  },
  stickyHeaderStyle: {
    marginTop: hp(16),
    marginHorizontal: wp(17),
    backgroundColor: colors.white,
  },
  iconStyle: {
    width: hp(22),
    height: hp(22),
    marginRight: wp(10),
  },
  rowSpaceHeaderStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonStyle: {
    marginHorizontal: wp(16),
    marginBottom: hp(20),
  },
});

export default ItemDetails;
