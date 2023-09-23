//import liraries
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { hp, wp } from "../../helper/globalFunctions";
import { SecondaryInputProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { fontFamily } from "../../helper/constants";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";

const SecondaryInput = ({
  placeholder,
  value,
  onChangeText,
  theme,
  keyboardType,
  onPressMapIcon,
  editable,
  maxLength,
  inputStyle,
  ref,
  onSubmitEditing,
  returnKeyType,
}: SecondaryInputProps) => {
  return (
    <>
      {theme === "map" ? (
        <Pressable onPress={onPressMapIcon} style={{ ...styles.mapContainer }}>
          <TextInput
            editable={editable}
            value={value}
            placeholder={placeholder}
            style={[styles.inputStyle, inputStyle]}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            multiline={theme === "map" ? true : false}
            placeholderTextColor={colors.borderGreyLight}
          />
          {theme === "map" && (
            <TouchableOpacity onPress={onPressMapIcon}>
              <ImageBackground
                style={styles.imageStyle}
                source={icons.map}
                resizeMode="contain"
                imageStyle={styles.imageStyle}
              >
                <View style={styles.circleStyle}>
                  <Image
                    resizeMode="contain"
                    source={icons.locationBlack}
                    style={styles.locationIconStyle}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        </Pressable>
      ) : (
        <View style={{ ...styles.container }}>
          <TextInput
            ref={ref}
            value={value}
            autoFocus={false}
            editable={editable}
            maxLength={maxLength}
            placeholder={placeholder}
            style={styles.inputStyle}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor={colors.borderGreyLight}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: wp(10),
    height: hp(60),
    marginTop: hp(20),
    paddingHorizontal: wp(20),
    flexDirection: "row",
    alignItems: "center",
  },
  mapContainer: {
    borderWidth: 1.5,
    marginTop: hp(20),
    borderRadius: wp(10),
    flexDirection: "row",
    paddingVertical: hp(16),
    paddingHorizontal: wp(20),
    alignItems: "flex-start",
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginBottom: hp(5),
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  imageStyle: {
    height: wp(80),
    width: wp(80),
    alignItems: "center",
    justifyContent: "center",
  },
  circleStyle: {
    height: wp(35),
    width: wp(35),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(35 / 2),
    backgroundColor: colors.white,
  },
  locationIconStyle: {
    height: wp(20),
    width: wp(20),
  },
});

export default SecondaryInput;
