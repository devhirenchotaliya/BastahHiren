import React, { useCallback } from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import MultiSlider, { LabelProps } from "@ptomasroos/react-native-multi-slider";
import { colors } from "../../theme/Colors";
import { hp, wp } from "../../helper/globalFunctions";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";

const customMarker = () => {
  return (
    <View style={styles.shadowBg}>
      <View style={styles.markerStyle}></View>
    </View>
  );
};

type RangeSliderViewProps = {
  min: number;
  max: number;
  onValuesChange?: (value: any) => void;
};

const RangeSliderView = ({
  min,
  max,
  onValuesChange,
}: RangeSliderViewProps) => {
  const { width } = useWindowDimensions();

  const { containerStyle, trackStyle, selectedStyle } = styles;

  const customLabel = useCallback(
    (prop: LabelProps) => {
      const {
        oneMarkerValue,
        twoMarkerValue,
        oneMarkerLeftPosition,
        twoMarkerLeftPosition,
      } = prop;
      const leftLabelDistance = oneMarkerLeftPosition - (width - 80) / 2 + 3;
      const rightLabelDistance = twoMarkerLeftPosition - 25 / 2 + 3;

      return (
        <View style={styles.labelViewContainer}>
          {Number.isFinite(oneMarkerLeftPosition) &&
            Number.isFinite(oneMarkerValue) && (
              <View style={[styles.sliderLabel, { left: leftLabelDistance }]}>
                <Text style={styles.lowPriceTextStyle}>
                  AED {oneMarkerValue}
                </Text>
              </View>
            )}

          {Number.isFinite(twoMarkerLeftPosition) &&
            Number.isFinite(twoMarkerValue) && (
              <View
                style={[
                  styles.sliderLabel,
                  { left: rightLabelDistance - wp(10), position: "absolute" },
                ]}
              >
                <Text style={styles.highPriceTextStyle}>
                  AED {twoMarkerValue}
                </Text>
              </View>
            )}
        </View>
      );
    },
    [width]
  );

  return (
    <MultiSlider
      {...{ containerStyle, trackStyle, selectedStyle }}
      markerContainerStyle={{ height: 55 }}
      values={[min, max]}
      sliderLength={width - wp(90)}
      max={max}
      min={min}
      allowOverlap={false}
      minMarkerOverlapDistance={80}
      isMarkersSeparated
      customMarkerLeft={() => customMarker()}
      customMarkerRight={() => customMarker()}
      enableLabel
      customLabel={customLabel}
      // onValuesChange={(value) => {
      //   console.log("value", value);
      // }}
      onValuesChange={onValuesChange}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    alignSelf: "center",
    // borderWidth: 1,
    marginBottom: hp(20),
    marginTop: hp(10),
  },
  trackStyle: {
    backgroundColor: colors.grey18,
    height: hp(7),
    borderRadius: wp(10),
  },
  selectedStyle: {
    backgroundColor: colors.grey,
    height: hp(7),
  },
  sliderLabel: {
    minWidth: 50,
    alignSelf: "center",
  },
  sliderLabelText: {
    color: "black",
    textAlign: "center",
  },
  markerStyle: {
    height: hp(25),
    width: wp(25),
    borderWidth: wp(4),
    borderRadius: wp(25 / 2),
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  shadowBg: {
    // width: 30,
    // height: 30,
    // borderRadius: 15,
    // // backgroundColor: 'rgba(128, 128, 128, 0.1)',
    // justifyContent: "center",
    // alignItems: "center",
    // // elevation: 12,
  },
  highPriceTextStyle: {
    ...commonFontStyle(fontFamily.medium, 16, colors.primary),
    textAlign: "left",
  },
  lowPriceTextStyle: {
    ...commonFontStyle(fontFamily.medium, 16, colors.grey8),
    textAlign: "center",
  },
  labelViewContainer: {
    top: 60,
    width: "100%",
    position: "absolute",
  },
});

export default RangeSliderView;
