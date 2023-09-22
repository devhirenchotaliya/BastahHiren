//import liraries
import React from "react";
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { fontFamily } from "../../helper/constants";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { RadioItemProps, SortModalProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";
import ReactNativeModal from "react-native-modal";
import { string } from "../../i18n/locales/en";
import { sortList } from "../../helper/dummyData";

const SortModal = ({
  onItemPress,
  selectedIndex,
  isVisible,
  onPressClose,
}: SortModalProps) => {
  const RadioItem = ({
    data,
    selectedIndex,
    index,
    onPress,
  }: RadioItemProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.rowSpaceStyle,
          borderBottomWidth: 0,
          borderTopWidth: 0.5,
          borderTopColor: colors.borderGrey,
        }}
      >
        <View style={styles.rowStyle}>
          <Image
            source={data.source}
            resizeMode="contain"
            style={styles.closeIconStyle}
          />
          <Text style={styles.radioTitleStyle}>{data.title}</Text>
        </View>
        {selectedIndex === index ? (
          <View
            style={{
              ...styles.unSelectedRadioStyle,
              ...styles.selectedRadioStyle,
            }}
          >
            <View style={styles.circleStyle} />
          </View>
        ) : (
          <View style={styles.unSelectedRadioStyle} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      onBackdropPress={onPressClose}
      swipeDirection={["up", "down"]}
      onSwipeComplete={onPressClose}
      onBackButtonPress={onPressClose}
    >
      <View style={styles.innerContainer}>
        <View style={styles.rowSpaceStyle}>
          <Text style={styles.titleTextStyle}>
            {getText(string.businesses.sort)}
          </Text>
          <TouchableOpacity onPress={onPressClose}>
            <Image
              resizeMode="contain"
              source={icons.close}
              style={styles.closeIconStyle}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={sortList}
          renderItem={({ item, index }) => {
            return (
              <RadioItem
                key={index}
                data={item}
                index={index}
                selectedIndex={selectedIndex}
                onPress={() => onItemPress(index)}
              />
            );
          }}
        />

        <View style={{ height: hp(15) }} />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    justifyContent: "flex-end",
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: wp(30),
    borderTopRightRadius: wp(30),
  },
  rowSpaceStyle: {
    flexDirection: "row",
    paddingVertical: hp(18),
    borderBottomWidth: 0.5,
    paddingHorizontal: wp(25),
    justifyContent: "space-between",
    borderBottomColor: colors.borderGrey,
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.semiBold, 23, colors.black2),
  },
  closeIconStyle: {
    height: hp(27),
    width: wp(27),
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioTitleStyle: {
    ...commonFontStyle(fontFamily.regular, 19, colors.black2),
    marginHorizontal: wp(10),
  },
  unSelectedRadioStyle: {
    height: hp(23),
    width: wp(23),
    borderWidth: wp(1.5),
    borderRadius: wp(23 / 2),
    borderColor: colors.priceGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadioStyle: {
    borderColor: colors.grey,
  },
  circleStyle: {
    height: hp(12),
    width: wp(12),
    borderRadius: wp(12 / 2),
    backgroundColor: colors.grey,
  },
});

export default SortModal;
