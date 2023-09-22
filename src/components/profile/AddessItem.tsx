import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { fontSize, hitSlop, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { AddessItemProps } from "../../helper/types";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";

const AddessItem = ({
  data,
  onPresSetDefault,
  onPressDelete,
}: AddessItemProps) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.labelTextStyle}>
          {data?.address?.address_type}
          {data?.is_default === 1 ? (
            <Text style={{ color: colors.grey }}>{" (Default) "}</Text>
          ) : null}
        </Text>
        <Text numberOfLines={2} style={styles.addressTextStyle}>
          {data?.address?.address}
        </Text>
      </View>
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu} hitSlop={hitSlop}>
            <Image
              source={icons.threeDot}
              resizeMode="contain"
              style={styles.threeDotStyle}
            />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem
          textStyle={styles.menuTextStyle}
          onPress={() => {
            hideMenu();
            if (onPresSetDefault) onPresSetDefault();
          }}
        >
          Set Default
        </MenuItem>
        <MenuDivider />
        <MenuItem
          textStyle={{ ...styles.menuTextStyle, color: colors.red }}
          onPress={() => {
            hideMenu();
            if (onPressDelete) onPressDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: hp(20),
    paddingHorizontal: wp(16),
    justifyContent: "space-between",
    borderBottomColor: colors.borderGreyLight,
  },
  nameContainer: {
    flex: 1,
    marginRight: wp(16),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
  },
  addressTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.darkGrey),
    lineHeight: fontSize(30),
    marginTop: hp(10),
  },
  threeDotStyle: {
    width: wp(4),
    height: hp(16),
  },
  menuTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
  },
});

export default AddessItem;
