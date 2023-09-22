import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getText, hitSlop, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { SearchBarProps } from "../../helper/types";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({
  ref,
  value,
  onChangeText,
  isFilterIcon,
  onPressFilter,
  containerStyle,
  isBackVisible,
  onTouchStart,
  editable = true,
  isCloseIcon,
  onPressClose,
  autoFocus,
}: SearchBarProps) => {
  const { goBack } = useNavigation();
  return (
    <View style={{ ...styles.rowContainer, ...containerStyle }}>
      {isBackVisible && (
        <TouchableOpacity onPress={() => goBack()} hitSlop={hitSlop}>
          <Image
            resizeMode="contain"
            source={icons.backArrow}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>
      )}

      <View style={styles.container}>
        {!editable ? (
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={onTouchStart}
            style={styles.notEditbleContainer}
          >
            <Text style={{ ...styles.inputStyle, color: colors.grey10 }}>
              {getText(string.home.search_here)}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            ref={ref}
            value={value}
            style={styles.inputStyle}
            onChangeText={onChangeText}
            autoFocus={autoFocus || false}
            placeholderTextColor={colors.grey10}
            placeholder={getText(string.home.search_here)}
          />
        )}
        {isCloseIcon && (
          <TouchableOpacity
            onPress={onPressClose}
            style={styles.closeContainer}
          >
            <Image
              source={icons.closeWhite}
              resizeMode="contain"
              style={styles.closeIconStyle}
            />
          </TouchableOpacity>
        )}

        {isFilterIcon ? (
          <TouchableOpacity onPress={onPressFilter}>
            <Image
              source={icons.filter}
              resizeMode="contain"
              style={styles.filterIconStyle}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchIconStyle}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(16),
  },
  container: {
    flex: 1,
    height: hp(52),
    borderRadius: wp(50),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(20),
    backgroundColor: colors.inputBack,
  },
  notEditbleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    marginRight: wp(15),
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
  },
  searchIconStyle: {
    height: hp(20),
    width: wp(20),
    marginLeft: wp(10),
  },
  filterIconStyle: {
    height: hp(35),
    width: wp(35),
    right: -wp(10),
  },
  backIconStyle: {
    height: hp(23),
    width: wp(12),
    marginRight: wp(15),
  },
  closeIconStyle: {
    height: wp(20),
    width: wp(20),
  },
  closeContainer: {
    height: wp(24),
    width: wp(24),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(28 / 2),
    backgroundColor: colors.primary,
  },
});

export default SearchBar;
