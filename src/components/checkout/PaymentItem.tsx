//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { PaymentItemProps } from "../../helper/types";

const PaymentItem = ({
  data,
  onItemPress,
  selectedId,
  index,
  cashAmount,
}: PaymentItemProps) => {
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.container}>
      <View style={styles.rowSpaceStyle}>
        <View style={styles.rowStyle}>
          <Image
            source={data?.icon}
            resizeMode="contain"
            style={styles.iconStyle}
          />
          <Text style={styles.titleTextStyle}>{data.label}</Text>
        </View>
        {selectedId === index ? (
          <View style={styles.selectedRadioStyle}>
            <View style={styles.circleStyle} />
          </View>
        ) : (
          <View
            style={{
              ...styles.selectedRadioStyle,
              borderColor: colors.priceGrey,
            }}
          />
        )}
      </View>
      {data?.isCard ? (
        <View style={{ ...styles.rowStyle, marginTop: hp(1) }}>
          <View style={styles.iconStyle} />
          {/* <Text style={styles.smallBlackTextStyle}>{data?.cardNumber}</Text> */}
        </View>
      ) : null}
      {data?.isCash ? (
        <View style={{ ...styles.rowStyle, marginTop: hp(1) }}>
          <View style={styles.iconStyle} />
          <Text style={styles.smallgreyTextStyle}>
            {data?.addtional_fee}
            {"AED "}
            {cashAmount}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    padding: wp(18),
    marginTop: hp(15),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: wp(10),
    marginBottom: hp(5),
  },
  rowSpaceStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconStyle: {
    height: wp(28),
    width: wp(28),
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.medium, 16, colors.primary),
    marginHorizontal: wp(15),
  },
  selectedRadioStyle: {
    height: wp(22),
    width: wp(22),
    borderWidth: 1,
    borderRadius: wp(22 / 2),
    borderColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  circleStyle: {
    height: wp(13),
    width: wp(13),
    borderRadius: wp(13 / 2),
    backgroundColor: colors.grey,
  },
  smallBlackTextStyle: {
    marginHorizontal: wp(15),
    ...commonFontStyle(fontFamily.light, 17, colors.black3),
  },
  smallgreyTextStyle: {
    marginHorizontal: wp(15),
    ...commonFontStyle(fontFamily.extraLight, 14, colors.grey14),
  },
});

export default PaymentItem;
