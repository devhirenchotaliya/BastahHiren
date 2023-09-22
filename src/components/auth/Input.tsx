//import liraries
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fontSize, hp, wp } from "../../helper/globalFunctions";
import { InputProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { fontFamily } from "../../helper/constants";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";

const Input = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
  onPressEye,
  isShowEyeIcon,
  theme = "first",
  autoCorrect,
  inputRef,
  returnKeyType,
  onSubmitEditing,
  ...rest
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.labelTextStyle}>
        {label}
      </Text>
      <View
        style={
          theme === "first"
            ? { ...styles.firstThemeContainer }
            : { ...styles.secondThemeContainer }
        }
      >
        <TextInput
          {...rest}
          ref={inputRef}
          value={value}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          style={styles.inputStyle}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={colors.borderGreyLight}
        />
        {isShowEyeIcon ? (
          <TouchableOpacity onPress={onPressEye}>
            <Image
              resizeMode="contain"
              style={styles.eyeIconStyle}
              source={secureTextEntry ? icons.eyeHide : icons.eye}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(25),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginBottom: hp(5),
  },
  firstThemeContainer: {
    height: hp(60),
    borderRadius: 10,
    marginTop: hp(5),
    backgroundColor: colors.inputBack,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(20),
  },
  secondThemeContainer: {
    height: hp(60),
    borderRadius: 10,
    marginTop: hp(5),
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(20),
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  eyeIconStyle: {
    height: hp(26),
    width: hp(26),
    tintColor: "#BDBDBD",
  },
});

export default Input;
