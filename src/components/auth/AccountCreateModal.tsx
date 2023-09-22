//import liraries
import { Image, StyleSheet, Text, View } from "react-native";
import { fontSize, getText, hp, wp } from "../../helper/globalFunctions";

import { colors } from "../../theme/Colors";
import { fontFamily } from "../../helper/constants";
import { commonFontStyle } from "../../theme/Fonts";

import ReactNativeModal from "react-native-modal";
import { string } from "../../i18n/locales/en";
import PrimaryButton from "../common/PrimaryButton";

const AccountCreateModal = ({
  isVisible,
  onStartShoppingPress,
}: {
  isVisible: boolean;
  onStartShoppingPress: () => void;
}) => {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.titleTextStyle}>
          {getText(string.sign_up.great)}
        </Text>
        <Text style={styles.greyTextStyle}>
          {getText(string.sign_up.account_success_text)}
        </Text>
        <PrimaryButton
          onPress={onStartShoppingPress}
          label={getText(string.sign_up.start_shopping)}
          containerStyle={{ marginBottom: hp(10) }}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    paddingVertical: hp(15),
    marginHorizontal: wp(10),
    borderRadius: wp(25),
    paddingHorizontal: wp(20),
    backgroundColor: colors.white,
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.medium, 27, colors.primary),
    textAlign: "center",
  },
  greyTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.grey17),
    textAlign: "center",
    lineHeight: fontSize(25),
    marginVertical: hp(10),
  },
});

export default AccountCreateModal;
