import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../theme/Colors";
import { hp } from "../../helper/globalFunctions";

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: hp(6),
    borderRadius: 2,
    backgroundColor: "#EAE9E5",
  },
});
