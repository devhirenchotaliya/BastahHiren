//import liraries
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { PhoneInputProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";

const PhoneInput = ({
  value,
  countryCode,
  onChangeText,
  onDownArrowPress,
  ref,
  inputStyle,
  autoFocus,
  returnKeyType,
  onSubmitEditing,
}: PhoneInputProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconMain} onPress={onDownArrowPress}>
        <Image
          source={icons.flag}
          resizeMode="contain"
          style={styles.flagStyle}
        />
        <Image
          source={icons.downArrow}
          resizeMode="contain"
          style={styles.downArrowStyle}
        />
      </TouchableOpacity>
      <Text style={[styles.countryCodeTextStyle, inputStyle]}>
        {countryCode}
      </Text>
      <TextInput
        ref={ref}
        value={value}
        maxLength={9}
        autoFocus={autoFocus || false}
        keyboardType="numeric"
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={[styles.inputStyle, inputStyle]}
        placeholderTextColor={colors.placeholderTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    height: hp(60),
    borderRadius: wp(8),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(10),
    borderColor: colors.inputBorder,
  },
  iconMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  downArrowStyle: {
    height: hp(8),
    width: wp(11),
    marginLeft: wp(5),
  },
  flagStyle: {
    height: hp(35),
    width: wp(35),
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    ...commonFontStyle(fontFamily.medium, 18, colors.darkGrey),
    marginLeft: wp(4),
  },
  countryCodeTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.darkGrey),
    marginLeft: wp(5),
  },
});

export default PhoneInput;
