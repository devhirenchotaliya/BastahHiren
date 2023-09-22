//import liraries
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownComponentProps } from "../../helper/types";

const DropdownComponent = ({
  onBlur,
  onFocus,
  label,
  data,
  setValue,
  value,
  placeholder,
  containerStyle,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text numberOfLines={1} style={styles.labelTextStyle}>
          {label}
        </Text>
      ) : null}
      <Dropdown
        search
        style={[styles.dropdown, isFocus && { borderColor: colors.grey }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="value"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => {
          setIsFocus(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          setIsFocus(false);
          if (onBlur) onBlur();
        }}
        onChange={(item: any) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(25),
  },
  dropdown: {
    height: hp(60),
    borderRadius: 10,
    marginTop: hp(5),
    backgroundColor: colors.white,
    paddingHorizontal: wp(20),
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
  },
  placeholderStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.borderGreyLight),
  },
  selectedTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  iconStyle: {
    width: wp(20),
    height: wp(20),
  },
  inputSearchStyle: {
    height: hp(45),
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginBottom: hp(5),
  },
});

export default DropdownComponent;
