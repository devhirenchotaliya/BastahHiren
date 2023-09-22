import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import { SearchBar } from "../../components";
import { getText, hitSlop, hp, wp } from "../../helper/globalFunctions";
import { RouterProps, SearchItemProps } from "../../helper/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
//@ts-ignore
import { debounce } from "lodash";
import {
  addRecentSearch,
  clearRecentSearch,
  getItemDetails,
  globalSearch,
} from "../../actions";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Search = ({ navigation, route }: RouterProps) => {
  const refInput = React.useRef(null);
  const dispatch = useAppDispatch();
  const { common, filter } = useAppSelector((state) => state);
  const { searchData } = filter;
  const { isSearchLoading } = common;
  const { dashBoardData } = useAppSelector((state) => state.home);

  const [searchText, setSearchText] = useState<string>("");

  const SearchItem = ({
    title,
    containerStyle,
    isShowCleanIcon,
    onItemPress,
    disabled,
    onPressClear,
  }: SearchItemProps) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onItemPress}
        style={{ ...styles.itemContainer, ...containerStyle }}
      >
        <Text style={styles.itemTitleTextStyle}>{title}</Text>
        {isShowCleanIcon && (
          <TouchableOpacity
            onPress={onPressClear}
            style={styles.cleanContainer}
          >
            <Text style={styles.cleanTextStyle}>
              {getText(string.search.clean)}
            </Text>
            <Image
              resizeMode="contain"
              source={icons.closeWhite}
              style={styles.closeIconStyle}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (refInput?.current) {
        // @ts-ignore
        refInput?.current?.focus();
      }
    }, 500);
  }, []);
  useFocusEffect(
    useCallback(() => {
      searchGlobalData();
      setSearchText("");
    }, [])
  );

  const searchGlobalData = (params?: any) => {
    let obj = {
      params: params,
      onSuccess: () => {},
      onFailure: () => {},
    };
    dispatch(globalSearch(obj));
  };

  const changeTextDebounced = (text: string) => {
    let params = { search: text };
    searchGlobalData(params);
  };

  const onChangeText = useCallback(debounce(changeTextDebounced, 400), []);

  const onPressClose = () => {
    setSearchText("");
    searchGlobalData();
  };

  const onPressItem = (type: string, item: any, search: string) => {
    console.log("item", item);
    let data = new FormData();
    data.append("search", search);
    let request = {
      data: data,
    };
    dispatch(addRecentSearch(request));
    typeWiseRedirection(type, item?.id);
  };

  const typeWiseRedirection = (type: string, id: number) => {
    if (type === "item") {
      let params = { item_id: id };
      dispatch(getItemDetails(params));
    } else if (type === "seller") {
      navigation.navigate(screenName.seller_profile, { seller_id: id });
    } else if (type === "category") {
      let data = dashBoardData?.main_categories;
      let index = data?.findIndex((obj: any) => obj?.id === id);
      navigation.navigate(screenName.tabBarName.categories, { index });
    }
  };

  const onPressClear = () => {
    dispatch(
      clearRecentSearch(() => {
        searchGlobalData();
      })
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <SearchBar
        autoFocus
        isBackVisible
        ref={refInput}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          onChangeText(text);
        }}
        onPressClose={onPressClose}
        containerStyle={{ marginVertical: hp(10) }}
        isCloseIcon={searchText?.length > 0 ? true : false}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {searchText?.trim()?.length === 0 ? (
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            scrollEnabled={false}
            data={searchData?.recent}
            renderItem={({ item, index }) => {
              return (
                <SearchItem
                  title={item?.title}
                  containerStyle={styles.itemContainerStyle}
                  onItemPress={() =>
                    typeWiseRedirection(item?.search_data, item.data_id)
                  }
                />
              );
            }}
            ListHeaderComponent={() => {
              if (searchData?.recent?.length === 0) return null;
              return (
                <SearchItem
                  isShowCleanIcon
                  disabled={true}
                  onPressClear={onPressClear}
                  title={getText(string.search.recent_searches)}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View>
            <FlatList
              keyboardShouldPersistTaps={"handled"}
              scrollEnabled={false}
              data={searchData?.sellers}
              renderItem={({ item, index }) => {
                return (
                  <SearchItem
                    title={item?.store_name}
                    containerStyle={styles.itemContainerStyle}
                    onItemPress={() =>
                      onPressItem("seller", item, item?.store_name)
                    }
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              keyboardShouldPersistTaps={"handled"}
              scrollEnabled={false}
              data={searchData?.categories}
              renderItem={({ item, index }) => {
                return (
                  <SearchItem
                    title={item?.name}
                    containerStyle={styles.itemContainerStyle}
                    onItemPress={() =>
                      onPressItem("category", item, item?.name)
                    }
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              keyboardShouldPersistTaps={"handled"}
              scrollEnabled={false}
              data={searchData?.items}
              renderItem={({ item, index }) => {
                return (
                  <SearchItem
                    title={item?.title}
                    containerStyle={styles.itemContainerStyle}
                    onItemPress={() => onPressItem("item", item, item?.title)}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    padding: wp(16),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(20),
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    borderBottomColor: colors.borderGrey,
    backgroundColor: colors.white,
  },
  itemTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 20, colors.primary),
  },
  cleanContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(50),
    paddingVertical: hp(5),
    paddingHorizontal: wp(10),
    backgroundColor: colors.primary,
  },
  cleanTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.white),
  },
  closeIconStyle: {
    height: hp(17),
    width: wp(17),
    marginLeft: wp(2),
  },
  itemContainerStyle: {
    marginHorizontal: wp(16),
    paddingHorizontal: 0,
  },
});

export default Search;
