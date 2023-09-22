import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { hp, wp } from "../../helper/globalFunctions";

import { EditProfileInputProps } from "../../helper/types";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { colors } from "../../theme/Colors";

const EditProfileInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  phoneCode,
  keyboardType,
  maxLength,
  editable,
}: EditProfileInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lableTextStyle}>{label}</Text>
      <View style={styles.rowStyle}>
        {phoneCode && <Text style={styles.inputStyle}>{phoneCode} </Text>}
        <TextInput
          value={value}
          editable={editable}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          style={{ ...styles.inputStyle, flex: 1 }}
        />
      </View>
      <View style={styles.lineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(20),
    paddingHorizontal: wp(16),
  },
  lableTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  inputStyle: {
    padding: 0,
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginVertical: hp(13),
    opacity: 0.5,
  },
  lineStyle: {
    height: hp(2),
    opacity: 0.1,
    backgroundColor: colors.primary,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default EditProfileInput;
