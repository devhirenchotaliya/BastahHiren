import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/Colors";
import { NoDataFound, RecentlyViewItem, SearchBar } from "../../components";
import { hp, wp } from "../../helper/globalFunctions";

import { screenName } from "../../helper/constants";
import { RouterProps } from "../../helper/types";
import { useFocusEffect } from "@react-navigation/native";
import { addRemoveFavourite, getFavouriteItems } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const MyFavorite = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { favouriteList } = useAppSelector((state) => state.favourite);
  const { isFavouriteLoading } = useAppSelector((state) => state.common);

  const onPressFilter = () => {
    navigation.navigate(screenName.filter);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getFavouriteItems());
    }, [])
  );

  const onHeartPressItem = (item: any) => {
    setSelectedItem(item.id);
    let data = new FormData();
    data.append("item_id", item?.id);
    let obj = {
      data,
      onSuccess: () => {
        dispatch(
          getFavouriteItems(true, () => {
            setSelectedItem("");
          })
        );
      },
      onFailure: () => setSelectedItem(""),
    };
    dispatch(addRemoveFavourite(obj));
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <SearchBar
        isBackVisible
        isFilterIcon
        value={searchText}
        onChangeText={setSearchText}
        onPressFilter={onPressFilter}
        containerStyle={{ marginVertical: hp(20) }}
      />
      {favouriteList?.length === 0 ? (
        <NoDataFound />
      ) : (
        <FlatList
          numColumns={2}
          data={favouriteList}
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <RecentlyViewItem
                isShowHeart
                key={index}
                data={item?.item}
                currentItem={selectedItem}
                isHeartLoading={isFavouriteLoading}
                onPressHeart={() => onHeartPressItem(item.item)}
              />
            );
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
        />
      )}
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
    paddingTop: hp(10),
  },
});

export default MyFavorite;
