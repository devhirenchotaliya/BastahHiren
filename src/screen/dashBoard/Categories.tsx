import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../theme/Colors";
import {
  SearchBar,
  TopTabBar,
  TopTabBarItem,
  CategoriesType,
  CategoriesItem,
} from "../../components";
import { hp, wp } from "../../helper/globalFunctions";
import { RouterProps } from "../../helper/types";
import { fontFamily, screenName } from "../../helper/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCategories, getSubCategories } from "../../actions";
import { commonFontStyle } from "../../theme/Fonts";

const Categories = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const { dashBoardData } = useAppSelector((state) => state.home);

  const {
    categoriesList,
    subCategoriesList,
    isCategorieLoading,
    isSubCategorieLoading,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    let index = route?.params?.index === undefined ? 0 : route?.params?.index;
    getCategoriesByCatId(dashBoardData?.main_categories?.[index].id, true);
    setTimeout(() => {
      setCurrentIndex(index);
    }, 200);
  }, [route?.params?.index]);

  const getCategoriesByCatId = (id: number, is_loading: boolean) => {
    setSelectedCategoryIndex(0);
    let obj = {
      is_loading_start: is_loading,
      params: {
        main_cat_id: id,
      },
      onSuccess: (res: any) => {
        if (res?.length) {
          let category_id = res?.[0]?.id;
          getSubCategoriesByCatId(category_id, is_loading);
        }
      },
    };
    dispatch(getCategories(obj));
  };

  const getSubCategoriesByCatId = (
    category_id: number,
    is_loading: boolean
  ) => {
    let data = {
      is_loading_start: is_loading,
      params: { category_id },
    };
    dispatch(getSubCategories(data));
  };

  const ScreenLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={"small"} color={colors.primary} />
      </View>
    );
  };

  const NoDataFound = () => {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.noDataFoundTextStyle}>{"No Results Found"}</Text>
      </View>
    );
  };

  const onPressTabItem = (index: number) => {
    setCurrentIndex(index);
    getCategoriesByCatId(dashBoardData?.main_categories?.[index].id, false);
  };
  const onPressCategorieItem = (index: number) => {
    setSelectedCategoryIndex(index);
    getSubCategoriesByCatId(categoriesList?.[index].id, false);
  };

  const onPressSubCategoryItem = (item: any) => {
    navigation?.navigate(screenName.item_list, {
      sub_category_id: item.id,
      category_id: item?.category_id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        editable={false}
        autoFocus={false}
        value={searchText}
        onChangeText={(t) => setSearchText(t)}
        containerStyle={{ marginVertical: hp(20) }}
        onTouchStart={() => navigation.navigate(screenName.search)}
      />
      <TopTabBar
        // @ts-ignore
        sections={dashBoardData?.main_categories}
        onPress={(index) => onPressTabItem(index)}
        currentIndex={currentIndex}
        renderTab={(item) => {
          return <TopTabBarItem key={item.id} data={item} />;
        }}
      />
      <View style={styles.innerContainer}>
        <View style={styles.categoriesTypeContainer}>
          {isCategorieLoading ? (
            <ScreenLoader />
          ) : (
            <>
              {categoriesList?.length === 0 ? (
                <NoDataFound />
              ) : (
                <FlatList
                  data={categoriesList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <CategoriesType
                        key={index}
                        data={item}
                        index={index}
                        selected={selectedCategoryIndex}
                        onPressItem={() => onPressCategorieItem(index)}
                      />
                    );
                  }}
                />
              )}
            </>
          )}
        </View>
        <View style={styles.categoriesListContainer}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            {isSubCategorieLoading ? (
              <ScreenLoader />
            ) : (
              <>
                {subCategoriesList?.length === 0 ? (
                  <NoDataFound />
                ) : (
                  <View style={styles.rowWrapStyle}>
                    {subCategoriesList.map((item: any, index: number) => {
                      return (
                        <CategoriesItem
                          key={index}
                          data={item}
                          imgStyle={styles.imgStyle}
                          containerStyle={styles.containerStyle}
                          nameTextStyle={styles.nameTextStyle}
                          onItemPress={() => onPressSubCategoryItem(item)}
                        />
                      );
                    })}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flexDirection: "row",
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesTypeContainer: {
    flex: 3.5,
    backgroundColor: colors.gery7,
  },
  categoriesListContainer: {
    flex: 6.5,
    backgroundColor: colors.white,
  },
  rowWrapStyle: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  containerStyle: {
    width: wp(66),
    marginRight: 0,
    marginTop: hp(15),
    marginHorizontal: wp(11),
  },
  imgStyle: {
    width: wp(66),
    height: wp(66),
    borderRadius: wp(66 / 2),
  },
  noDataFoundTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 11, colors.primary),
    flexWrap: "wrap",
    flexShrink: 1,
  },
});

export default Categories;
