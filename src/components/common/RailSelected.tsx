import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { hp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: hp(7),
    borderRadius: 2,
    backgroundColor: colors.grey,
  },
});
