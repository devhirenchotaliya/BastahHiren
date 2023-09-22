//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import {
  hp,
  wp,
  fontSize,
  notifiactionTime,
} from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { NotificationItemProps } from "../../helper/types";

const NotificationItem = ({ data }: NotificationItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowStyle}>
        <Text numberOfLines={1} style={styles.labelTextStyle}>
          {data?.title}
        </Text>
        <Text style={styles.timeTextStyle}>
          {notifiactionTime(data?.created_at)}
        </Text>
      </View>
      <Text style={styles.messageTextStyle}>{data?.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    paddingHorizontal: wp(16),
    paddingVertical: hp(20),
    borderBottomColor: colors.borderGreyLight,
  },
  timeTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.grey9),
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
    flex: 1,
    marginRight: wp(20),
  },
  messageTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.grey9),
    marginTop: hp(5),
    lineHeight: fontSize(25),
    marginRight: wp(20),
  },
});

export default NotificationItem;
