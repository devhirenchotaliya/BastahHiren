import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../theme/Colors";

const Loader = ({ visible = false }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={style.containerStyle}>
        <ActivityIndicator
          size={"large"}
          color={colors.grey}
          style={style.loaderStyle}
        />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  loaderStyle: {
    // backgroundColor: colors.white,
    // padding: wp(20),
    // borderRadius: wp(10),
  },
});

export default Loader;
