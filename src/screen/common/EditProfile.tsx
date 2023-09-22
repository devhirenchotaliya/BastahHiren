import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import {
  AuthHeader,
  DeleteButton,
  LogoutModal,
  PrimaryButton,
} from "../../components";
import {
  dispatchNavigation,
  getText,
  hp,
  infoToast,
  openImagePicker,
  successToast,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { icons } from "../../theme/Icons";
import EditProfileInput from "../../components/profile/EditProfileInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteAccount, updateProfile } from "../../actions";
import { nameCheck } from "../../helper/validation";
import FastImage from "react-native-fast-image";
import { screenName } from "../../helper/constants";

const EditProfile = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.common);
  const [fullName, setFullName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isPictureEdit, setIsPictureEdit] = useState<boolean>(false);
  const [isImgLoader, setIsImgLoader] = useState<boolean>(true);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [imageData, setImageData] = useState<any>({
    uri: "",
  });

  useEffect(() => {
    setEmail(userInfo.email);
    setMobile(userInfo.phone);
    setFullName(userInfo.name);
    setImageData({ uri: userInfo.picture });
  }, [userInfo]);

  const onPressProfilePic = () => {
    openImagePicker({
      onSucess: (res) => {
        setImageData(res);
        setIsPictureEdit(true);
      },
    });
  };

  const onPressSaveChanges = () => {
    if (fullName?.trim()?.length === 0) {
      infoToast("Please enter your full name");
    } else if (!nameCheck(fullName)) {
      infoToast("Please enter your proper full name");
    } else if (mobile?.trim()?.length === 0) {
      infoToast("Please enter your mobile number");
    } else if (mobile?.trim()?.length !== 9) {
      infoToast("Please enter valid mobile number");
    } else {
      let data = new FormData();
      data.append("name", fullName);
      data.append("phone", mobile);
      if (isPictureEdit) {
        data.append("picture", {
          uri: imageData?.uri,
          type: imageData?.mime,
          name: imageData?.name,
        });
      }
      let obj = {
        data,
        onSuccess: (response: any) => {
          successToast(response?.message);
        },
        onFailure: () => {},
      };
      dispatch(updateProfile(obj));
    }
  };

  const onPressDeleteAccount = () => {
    const obj = {
      onSuccess: () => {
        dispatchNavigation(screenName.sign_in);
      },
      onFailure: () => {},
    };
    dispatch(deleteAccount(obj));
  };

  const onPressYesDelete = () => {
    setIsDeleteModal(false);
    onPressDeleteAccount();
  };

  const onPressNoDelete = () => {
    setIsDeleteModal(false);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader
        borderBottomWidth={0}
        title={getText(string.edit_profile.edit_personal_detail)}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
        <TouchableOpacity
          onPress={onPressProfilePic}
          style={{
            ...styles.imgStyle,
            marginVertical: hp(5),
            backgroundColor: colors.inputBack,
          }}
        >
          <FastImage
            style={{
              ...styles.imgStyle,
              justifyContent: "center",
              alignItems: "center",
            }}
            onLoadStart={() => setIsImgLoader(true)}
            onLoadEnd={() => setIsImgLoader(false)}
            resizeMode="cover"
            source={{
              uri: imageData!.uri,
              priority: FastImage.priority.high,
            }}
          >
            {isPictureEdit ? (
              <View style={styles.imgStyle} />
            ) : (
              <ImageBackground
                resizeMode="cover"
                style={styles.imgStyle}
                source={icons.opacityCircle}
              >
                <Image
                  resizeMode="contain"
                  source={icons.camera}
                  style={styles.cameraIconStyle}
                />
              </ImageBackground>
            )}
            {isImgLoader && (
              <ActivityIndicator
                size={"large"}
                color={colors.grey}
                style={styles.loaderStyle}
              />
            )}
          </FastImage>
        </TouchableOpacity>

        <EditProfileInput
          value={fullName}
          onChangeText={setFullName}
          label={getText(string.edit_profile.full_name)}
        />
        <EditProfileInput
          maxLength={9}
          value={mobile}
          phoneCode="+971"
          keyboardType="numeric"
          onChangeText={setMobile}
          label={getText(string.edit_profile.mobile_number)}
        />
        <EditProfileInput
          value={email}
          editable={false}
          onChangeText={setEmail}
          label={getText(string.edit_profile.email_address)}
        />
        <PrimaryButton
          onPress={onPressSaveChanges}
          containerStyle={styles.buttonContainer}
          label={getText(string.edit_profile.save_changes)}
        />
        <DeleteButton
          onPress={() => setIsDeleteModal(true)}
          containerStyle={styles.deleteButtonContainer}
          label={getText(string.edit_profile.delete_account)}
        />
      </KeyboardAwareScrollView>
      <LogoutModal
        source={icons.remove}
        isVisible={isDeleteModal}
        onPressNo={onPressNoDelete}
        onPressYes={onPressYesDelete}
        iconStyle={{ tintColor: colors.red }}
        title={getText(string.edit_profile.delete_account)}
        question={getText(string.edit_profile.delete_account_message)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgStyle: {
    height: wp(130),
    width: wp(130),
    alignSelf: "center",
    borderRadius: wp(130 / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconStyle: {
    height: hp(40),
    width: wp(49),
  },
  buttonContainer: {
    marginHorizontal: wp(25),
    marginTop: hp(40),
  },
  deleteButtonContainer: {
    marginHorizontal: wp(25),
  },
  loaderStyle: {
    zIndex: 1,
    position: "absolute",
  },
});

export default EditProfile;
