//import liraries
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { string } from "../../i18n/locales/en";

const NoDataFound = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelTextStyle}>
        {getText(string.common.no_data_found)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelTextStyle: {
    textAlign: "center",
    ...commonFontStyle(fontFamily.medium, 18, colors.whiteGray),
  },
});

export default NoDataFound;
