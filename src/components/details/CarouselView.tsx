import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CarouselViewProps } from "../../helper/types";
import {
  hp,
  wp,
  isIos,
  hitSlop,
  screen_width,
  screen_height,
  isNotchDevice,
} from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { icons } from "../../theme/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";

const CarouselView = ({
  data,
  onPressBack,
  onPressHeart,
  is_favourite,
  isHeartLoading,
}: CarouselViewProps) => {
  const isCarousel: any = useRef(null);
  const [index, setIndex] = useState<number>(0);

  const _renderItem = ({ item, index }: { item: string; index: number }) => (
    <FastImage
      style={styles.itemImageStyle}
      resizeMode={FastImage.resizeMode.cover}
      source={{ uri: item?.image, priority: FastImage.priority.high }}
    />
  );

  return (
    <View style={{}}>
      <Carousel
        data={data}
        loop={false}
        firstItem={0}
        autoplay={true}
        ref={isCarousel}
        layout={"default"}
        useScrollView={true}
        autoplayDelay={3000}
        autoplayInterval={5000}
        // @ts-ignore
        renderItem={_renderItem}
        itemWidth={screen_width}
        sliderWidth={screen_width}
        sliderHeight={screen_height / 2}
        onSnapToItem={(index: number) => setIndex(index)}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          tappableDots={true}
          animatedFriction={3}
          animatedTension={500}
          activeDotIndex={index}
          inactiveDotScale={0.9}
          inactiveDotOpacity={0.9}
          carouselRef={isCarousel}
          dotsLength={data?.length}
          dotStyle={styles.dotStyle}
          containerStyle={styles.containerStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
        />
      </View>
      {/* <SafeAreaView style={styles.backIconStyle}>
        <TouchableOpacity onPress={onPressBack} hitSlop={hitSlop}>
          <Image
            resizeMode="contain"
            style={styles.iconStyle}
            source={icons.backWhite}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.heartIconStyle}>
        {isHeartLoading ? (
          <ActivityIndicator size={"small"} color={colors.primary} />
        ) : (
          <TouchableOpacity onPress={onPressHeart} hitSlop={hitSlop}>
            <Image
              resizeMode="contain"
              style={styles.iconStyle}
              source={is_favourite === 1 ? icons.heartSelected : icons.heart}
            />
          </TouchableOpacity>
        )}
      </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  paginationContainer: {
    position: "absolute",
    width: screen_width,
    bottom: 0,
  },
  itemImageStyle: {
    width: screen_width,
    height: screen_height / 2,
    backgroundColor: colors.inputBack,
  },
  dotStyle: {
    width: wp(30),
    height: hp(6),
    borderRadius: wp(5),
    marginHorizontal: wp(-3),
    backgroundColor: colors.white,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: wp(5),
    elevation: 5,
  },
  inactiveDotStyle: {
    width: wp(13),
    height: hp(6),
    borderRadius: 5,
    marginHorizontal: wp(-3),
    backgroundColor: colors.white,
  },
  containerStyle: {
    alignSelf: "flex-end",
  },
  backIconStyle: {
    left: wp(16),
    position: "absolute",
    top: isNotchDevice ? hp(16) : hp(20),
  },
  iconStyle: {
    height: hp(22),
    width: hp(22),
  },
  heartIconStyle: {
    right: wp(16),
    position: "absolute",
    top: isNotchDevice ? hp(16) : hp(20),
  },
});

export default CarouselView;
