import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../theme/Colors";
import {
  BusinessesItem,
  RecentlyViewItem,
  SearchBar,
  SortModal,
} from "../../components";
import { hp, wp } from "../../helper/globalFunctions";
import { recentlyViewedList, sortList } from "../../helper/dummyData";
import { screenName } from "../../helper/constants";
import { RouterProps } from "../../helper/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSellerProfile } from "../../actions";
import FastImage from "react-native-fast-image";
//@ts-ignore
import { debounce } from "lodash";

const SellerProfile = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { sellerDetails } = useAppSelector((state) => state.seller);
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterModal, setIsFilterModal] = useState<boolean>(false);
  const selectedSortIndex = useRef<number | null | undefined>(null);

  useEffect(() => {
    getSellerProfileData();
  }, []);

  const getSellerProfileData = () => {
    let params = { seller_id: route?.params?.seller_id };
    dispatch(getSellerProfile(params));
  };

  const onPressFilter = () => setIsFilterModal(true);

  const onPressSortItem = (sort_by: string) => {
    let params = {
      seller_id: route?.params?.seller_id,
      sort_by: sort_by,
    };
    dispatch(getSellerProfile(params));
  };

  const onPressCloseSearch = () => {
    setSearchText("");
    getSellerProfileData();
  };

  const changeTextDebounced = (text: string) => {
    let params: any = {
      seller_id: route?.params?.seller_id,
      search: text,
    };
    if (selectedSortIndex.current !== null) {
      params.sort_by = sortList[selectedSortIndex.current || 0].sort_by;
    }
    dispatch(getSellerProfile(params, true));
  };

  const onChangeText = useCallback(debounce(changeTextDebounced, 400), []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <SearchBar
        isCloseIcon={searchText?.length ? true : false}
        isFilterIcon
        isBackVisible
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          onChangeText(text);
        }}
        onPressClose={onPressCloseSearch}
        onPressFilter={onPressFilter}
        containerStyle={{ marginVertical: hp(10) }}
      />
      <ScrollView>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.bannerStyle}
          source={{
            uri: sellerDetails?.cover_img,
            priority: FastImage.priority.normal,
          }}
        />

        <BusinessesItem
          disabled={true}
          image={sellerDetails?.picture}
          name={sellerDetails?.store_name}
          avgRate={sellerDetails?.avg_rate}
          totalRate={sellerDetails?.total_rate}
          containerStyle={{ borderTopWidth: 0 }}
          description={sellerDetails?.store_description}
          onStarPress={() => navigation.navigate(screenName.add_review)}
        />

        <FlatList
          numColumns={2}
          scrollEnabled={false}
          data={sellerDetails?.items || []}
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <RecentlyViewItem key={index} data={item} />;
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
        />
      </ScrollView>
      <SortModal
        isVisible={isFilterModal}
        selectedIndex={selectedSortIndex.current}
        onPressClose={() => setIsFilterModal(false)}
        onItemPress={(index) => {
          selectedSortIndex.current = index;
          setIsFilterModal(false);
          onPressSortItem(sortList[index].sort_by);
          setSearchText("");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(20),
  },
  bannerStyle: {
    width: "100%",
    height: hp(220),
    marginTop: hp(10),
    backgroundColor: colors.inputBack,
  },
});

export default SellerProfile;
