import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import { RouterProps } from "../../helper/types";
import {
  BestSellerItem,
  CarouselBanner,
  CategoriesItem,
  HomeHeader,
  RecentlyViewItem,
  SearchBar,
  ViewAllHeader,
} from "../../components";
import { images } from "../../theme/Icons";
import { getText, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { screenName } from "../../helper/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCart,
  getSettings,
  getDashboard,
  getItemDetails,
} from "../../actions";

const Home = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.common);
  const { dashBoardData } = useAppSelector((state) => state.home);
  const [searchText, setSearchText] = useState<string>("");

  const onPressBestSellerItem = (item: any) => {
    let params = { item_id: item.id };
    dispatch(getItemDetails(params));
  };

  const onCategoriesItem = (index: number) => {
    navigation.navigate(screenName.tabBarName.categories, { index });
  };

  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getCart(() => {}, true));
    dispatch(getSettings());
  }, []);

  const onPressViewAll = (title: string, list: any) => {
    navigation.navigate(screenName.all_view_item, {
      headerTitle: title,
      listItems: list,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        isGuest={userInfo?.isGuest}
        userName={userInfo?.name}
        profileIcon={userInfo?.isGuest ? images.guestUser : userInfo.picture}
        onCartPress={() =>
          navigation.navigate(screenName.tabBarName.my_shopping)
        }
      />
      <ScrollView>
        <SearchBar
          editable={false}
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          onTouchStart={() => navigation.navigate(screenName.search)}
        />
        <CarouselBanner data={dashBoardData?.banners} />
        <FlatList
          horizontal
          data={dashBoardData.main_categories}
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <CategoriesItem
                data={item}
                onItemPress={() => onCategoriesItem(index)}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          data={dashBoardData.groups}
          renderItem={({ item, index }) => {
            return (
              <View>
                <ViewAllHeader
                  headerTitle={item?.name}
                  onPressViewAll={() => onPressViewAll(item?.name, item?.items)}
                />
                <FlatList
                  horizontal
                  data={item?.items || []}
                  style={styles.listContainer}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <BestSellerItem
                        data={item}
                        onPressItem={() => onPressBestSellerItem(item)}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        {dashBoardData?.recent_views?.length > 0 ? (
          <>
            <ViewAllHeader
              headerTitle={getText(string.home.recently_viewed)}
              onPressViewAll={() =>
                onPressViewAll(
                  getText(string.home.recently_viewed),
                  dashBoardData?.recent_views
                )
              }
            />
            <FlatList
              numColumns={2}
              scrollEnabled={false}
              data={dashBoardData?.recent_views}
              showsHorizontalScrollIndicator={false}
              columnWrapperStyle={styles.columnWrapperStyle}
              keyExtractor={(item, index) => index.toString()}
              style={{ ...styles.listContainer, marginHorizontal: wp(16) }}
              renderItem={({ item, index }) => {
                return <RecentlyViewItem key={index} data={item?.item} />;
              }}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainer: {
    marginLeft: wp(16),
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
});

export default Home;
