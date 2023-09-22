import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import {
  AddessItem,
  AuthHeader,
  NoDataFound,
  PrimaryButton,
} from "../../components";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenName } from "../../helper/constants";
import { getAddress, makeAddressDefault, removeAddress } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const MyAddress = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { addressList } = useAppSelector((state) => state.address);
  const onAddNewAddressPress = () => {
    navigation.navigate(screenName.new_address);
  };

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  const onPressItemSetDefault = (item: any) => {
    let data = new FormData();
    data.append("address_id", item.id);
    let obj = {
      data,
      onSuccess: () => {
        dispatch(getAddress());
      },
      onFailure: () => {},
    };
    dispatch(makeAddressDefault(obj));
  };

  const onPressItemDelete = (item: any) => {
    let data = new FormData();
    data.append("address_id", item.id);
    let obj = {
      data,
      onSuccess: () => {
        dispatch(getAddress());
      },
      onFailure: () => {},
    };
    dispatch(removeAddress(obj));
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.my_address.my_address)} />
      {addressList?.length === 0 ? (
        <NoDataFound />
      ) : (
        <FlatList
          data={addressList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <AddessItem
                data={item}
                key={index}
                onPressDelete={() => onPressItemDelete(item)}
                onPresSetDefault={() => onPressItemSetDefault(item)}
              />
            );
          }}
        />
      )}

      <PrimaryButton
        isAddIconShow
        onPress={onAddNewAddressPress}
        containerStyle={styles.buttonContainer}
        label={getText(string.my_address.add_new_address)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginHorizontal: wp(25),
    marginVertical: hp(30),
  },
});

export default MyAddress;
