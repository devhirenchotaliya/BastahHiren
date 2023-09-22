//import liraries
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { fontSize, hp, wp } from "../../helper/globalFunctions";
import { SignInBtnProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { fontFamily } from "../../helper/constants";
import { commonFontStyle } from "../../theme/Fonts";

const SignInBtn = ({
  iconName,
  onBtnPress,
  containerStyle,
  title,
  titleStyle,
  iconStyles,
}: SignInBtnProps) => {
  return (
    <TouchableOpacity
      onPress={onBtnPress}
      style={[styles.container, containerStyle]}
    >
      <Image
        source={iconName}
        resizeMode="contain"
        style={[styles.iconStyle, iconStyles]}
      />
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    borderRadius: wp(40),
    paddingLeft: wp(65),
    height: hp(50),
  },
  iconStyle: {
    width: wp(38),
    height: wp(38),
  },
  titleText: {
    lineHeight: fontSize(23.75),
    marginLeft: wp(5),
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
});

export default SignInBtn;
