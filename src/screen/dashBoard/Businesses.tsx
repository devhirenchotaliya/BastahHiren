import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { colors } from "../../theme/Colors";
import { BusinessesItem, NoDataFound, SearchBar } from "../../components";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { RouterProps } from "../../helper/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSellersList } from "../../actions";
//@ts-ignore
import { debounce } from "lodash";

const Businesses = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { sellerList } = useAppSelector((state) => state.seller);
  const [searchText, setSearchText] = useState<string>("");
  const [isData, setIsData] = useState(true);

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = () => {
    dispatch(getSellersList((isData) => setIsData(isData)));
  };

  const changeTextDebounced = (text: string) => {
    let params = { search: text };
    dispatch(getSellersList((isData) => setIsData(isData), true, params));
  };

  const onChangeText = useCallback(debounce(changeTextDebounced, 400), []);

  const onPressClose = () => {
    setSearchText("");
    getSellerData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTextStyle}>
        {getText(string.businesses.businesses)}
      </Text>
      <SearchBar
        value={searchText}
        onPressClose={onPressClose}
        containerStyle={{ marginVertical: hp(20) }}
        isCloseIcon={searchText?.length > 0 ? true : false}
        onChangeText={(text) => {
          setSearchText(text);
          onChangeText(text);
        }}
      />
      {isData ? (
        <FlatList
          style={styles.listStyle}
          data={sellerList || []}
          renderItem={({ item, index }) => {
            return (
              <BusinessesItem
                key={index}
                image={item?.picture}
                seller_id={item?.id}
                name={item?.store_name}
                avgRate={item?.avg_rate}
                totalRate={item?.total_rate}
                description={item?.store_description}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
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
  titleTextStyle: {
    paddingTop: hp(16),
    paddingHorizontal: wp(16),
    ...commonFontStyle(fontFamily.medium, 22, colors.primary),
  },
  lineStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGrey,
  },
  listStyle: {
    marginTop: hp(5),
  },
});

export default Businesses;
