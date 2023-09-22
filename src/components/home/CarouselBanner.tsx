import React, { useRef, useState } from "react";
import { View, StyleSheet, ImageURISource } from "react-native";
import { BannerItemProps, CarouselViewProps } from "../../helper/types";
import {
  hp,
  wp,
  isIos,
  screen_width,
  screen_height,
} from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Banner from "./Banner";

const CarouselBanner = ({ data }: any) => {
  const isCarousel: any = useRef(null);
  const [index, setIndex] = useState<number>(0);

  const _renderItem = ({
    item,
    index,
  }: {
    item: BannerItemProps;
    index: number;
  }) => <Banner data={item} key={index} />;

  return (
    <View style={{}}>
      <Carousel
        data={data || []}
        loop={false}
        firstItem={0}
        autoplay={false}
        ref={isCarousel}
        layout={"default"}
        useScrollView={false}
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
    top: isIos ? hp(16) : hp(20),
  },
  iconStyle: {
    height: hp(22),
    width: hp(22),
  },
  heartIconStyle: {
    right: wp(16),
    position: "absolute",
    top: isIos ? hp(16) : hp(20),
  },
});

export default CarouselBanner;
