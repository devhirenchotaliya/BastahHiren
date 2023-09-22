import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import {
  AccountItem,
  AuthHeader,
  LogoutModal,
  PrimaryButton,
} from "../../components";
import {
  dispatchNavigation,
  getText,
  hp,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { accountList } from "../../helper/dummyData";
import { RouterProps } from "../../helper/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userLogout } from "../../actions";
import FastImage from "react-native-fast-image";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { icons } from "../../theme/Icons";

const Profile = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.common);

  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [profileAccountList, setProfileAccount] = useState(accountList);

  useEffect(() => {
    let data: any = [];
    profileAccountList.map((i) => {
      if (userInfo.isGuest) {
        if (i.id === 2 || i.id === 7 || i.id === 8) {
          data.push(i);
        }
      } else {
        data.push(i);
      }
    });
    setProfileAccount(data);
  }, []);

  const onPressSignInUp = () => {
    navigation.navigate(screenName.sign_in);
  };

  const onItemPress = (item: any) => {
    if (item.label !== "Logout") {
      navigation.navigate(item.screenName);
    } else {
      setIsLogoutModal(true);
    }
  };

  const onPressYesLogout = () => {
    setIsLogoutModal(false);
    const obj = {
      onSuccess: async () => {
        if (userInfo?.googleId !== null) {
          await GoogleSignin.signOut();
        }
        dispatchNavigation(screenName.sign_in);
      },
      onFailure: () => {},
    };
    dispatch(userLogout(obj));
  };
  const onPressNoLogout = () => {
    setIsLogoutModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        title={getText(string.profile.profile)}
        borderBottomWidth={0}
      />
      {userInfo?.isGuest ? (
        <PrimaryButton
          onPress={onPressSignInUp}
          containerStyle={styles.buttonStyle}
          label={getText(string.profile.signin_signup)}
        />
      ) : (
        <View style={styles.profileContainer}>
          <FastImage
            resizeMode="cover"
            style={styles.profileImgStyle}
            source={{
              uri: userInfo?.picture,
              priority: FastImage.priority.normal,
            }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.nameTextStyle}>{userInfo?.name}</Text>
            <View style={{ height: hp(7) }} />
            <Text style={styles.emailTextStyle}>{userInfo?.email}</Text>
          </View>
        </View>
      )}

      <View style={styles.accountContainer}>
        <Text style={styles.accountTextStyle}>
          {getText(string.profile.accounts)}
        </Text>
      </View>
      <FlatList
        data={profileAccountList}
        renderItem={({ item, index }) => {
          return (
            <AccountItem
              data={item}
              key={index}
              index={index}
              onPress={() => onItemPress(item)}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <LogoutModal
        source={icons.logout}
        isVisible={isLogoutModal}
        onPressNo={onPressNoLogout}
        onPressYes={onPressYesLogout}
        title={getText(string.profile.logout)}
        question={getText(string.profile.logout_message)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(10),
    flexDirection: "row",
    alignItems: "center",
  },
  profileImgStyle: {
    height: wp(65),
    width: wp(65),
    borderRadius: wp(65 / 2),
    backgroundColor: colors.inputBack,
  },
  nameContainer: {
    flex: 1,
    marginLeft: wp(20),
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 23, colors.primary),
  },
  emailTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.grey11),
  },
  accountTextStyle: {
    ...commonFontStyle(fontFamily.regular, 20, colors.grey12),
  },
  accountContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGrey,
    padding: wp(16),
  },
  buttonStyle: {
    marginHorizontal: wp(20),
  },
});

export default Profile;
