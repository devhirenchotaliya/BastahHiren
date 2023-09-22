import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/Colors";
import { NoDataFound, RecentlyViewItem, SearchBar } from "../../components";
import { arrayConvertFormData, hp, wp } from "../../helper/globalFunctions";
import { screenName } from "../../helper/constants";
import { RouterProps } from "../../helper/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addRemoveFavourite, filterItems, getItems } from "../../actions";
// @ts-ignore
import { debounce } from "lodash";

const ItemList = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isData, setIsData] = useState<boolean>(true);
  const filterDataRef = useRef([]);

  const { itemsList } = useAppSelector((state) => state.categories);
  const { isFavouriteLoading } = useAppSelector((state) => state.common);

  useEffect(() => {
    getItemsList(false);
  }, [route?.params?.sub_category_id, route?.params?.category_id]);

  const getItemsList = (isStopScreenLoading: boolean, search?: string) => {
    let data = {
      params: {
        sub_category_id: route?.params?.sub_category_id,
        category_id: route?.params?.category_id,
        search: search,
      },
      onSuccess: (response: any) => {
        setIsData(response?.items?.length > 0 ? true : false);
        setSelectedItem("");
      },
    };
    dispatch(getItems(data, isStopScreenLoading));
  };

  const onPressFilter = () => {
    navigation.navigate(screenName.filter, {
      getFilterFormData: (data: any) => {
        setSearchText("");
        filterDataRef.current = data;
        getFilter(false, data);
      },
    });
  };

  const getFilter = (is_loading_stop: boolean, data: any) => {
    let obj = {
      is_loading_stop: is_loading_stop,
      data: arrayConvertFormData(data),
      onSuccess: (response: any) => {
        setIsData(response?.items?.length > 0 ? true : false);
        setSelectedItem("");
      },
      onFailure: () => {},
    };
    dispatch(filterItems(obj));
  };

  const onHeartPressItem = (item: any) => {
    setSelectedItem(item.id);
    let data = new FormData();
    data.append("item_id", item?.id);
    let obj = {
      data,
      onSuccess: () => {
        if (filterDataRef?.current?.length > 0) {
          getFilter(true, filterDataRef?.current);
        } else {
          getItemsList(true);
        }
      },
      onFailure: () => setSelectedItem(""),
    };
    dispatch(addRemoveFavourite(obj));
  };

  const changeTextDebounced = (text: string) => {
    if (filterDataRef?.current?.length > 0) {
      let data = [...filterDataRef?.current];
      let obj = {
        search: text,
      };
      //@ts-ignore
      data.push(obj);
      getFilter(false, data);
    } else {
      getItemsList(false, text);
    }
  };

  const onChangeText = useCallback(debounce(changeTextDebounced, 500), []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        isBackVisible
        isFilterIcon
        autoFocus={false}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          onChangeText(text);
        }}
        onPressFilter={onPressFilter}
        containerStyle={{ marginVertical: hp(20) }}
      />
      {isData ? (
        <FlatList
          numColumns={2}
          data={itemsList}
          style={styles.listContainer}
          keyboardShouldPersistTaps={"handled"}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <RecentlyViewItem
                isShowHeart
                key={index}
                data={item}
                currentItem={selectedItem}
                isHeartLoading={isFavouriteLoading}
                onPressHeart={() => onHeartPressItem(item)}
              />
            );
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
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
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(10),
  },
});

export default ItemList;
