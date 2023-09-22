import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import { AuthHeader, CardItem, CartItem, NoDataFound } from "../../components";
import { getText, hp, infoToast, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FlatList } from "react-native";
import { myCards } from "../../actions";

const MyCards = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();

  const { myCardList } = useAppSelector((state) => state.payment);
  const [isData, setIsData] = useState<boolean>(true);

  useEffect(() => {
    dispatch(myCards((isData) => setIsData(isData)));
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.my_cards.my_cards)} />
      {isData ? (
        <FlatList
          data={myCardList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <CardItem data={item} key={index} />;
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
  innerContainer: {
    paddingTop: hp(16),
    paddingHorizontal: wp(16),
  },
});

export default MyCards;
