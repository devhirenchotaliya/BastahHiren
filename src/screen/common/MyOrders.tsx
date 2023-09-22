import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import { AuthHeader, MyOrderItem, NoDataFound } from "../../components";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenName } from "../../helper/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearOrderDetails, myOrders } from "../../actions";

const MyOrders = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { myOrderList } = useAppSelector((state) => state.order);
  const [isData, setIsData] = useState<boolean>(true);

  useEffect(() => {
    dispatch(myOrders((isData) => setIsData(isData)));
  }, []);

  const onPressItem = (item: any) => {
    dispatch(clearOrderDetails());
    navigation.navigate(screenName.order_details, { order_id: item?.id });
  };

  const onBackPress = () => {
    if (route?.params?.isOrderSuccessScreen) {
      navigation.navigate(screenName.bottom_tab_navigator);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader
        onBackPressScreen={onBackPress}
        title={getText(string.check_out.my_orders)}
      />
      {isData ? (
        <FlatList
          data={myOrderList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <MyOrderItem
                key={index}
                data={item}
                onPress={() => onPressItem(item)}
              />
            );
          }}
        />
      ) : (
        <NoDataFound />
      )}
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

export default MyOrders;
