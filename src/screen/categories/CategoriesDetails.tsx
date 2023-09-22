import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import {
  FashionItem,
  RecentlyViewItem,
  SearchBar,
  TopTabBar,
  TopTabBarItem,
} from "../../components";
import { getText, hp, wp } from "../../helper/globalFunctions";
import {
  categoriesList,
  fashionList,
  recentlyViewedList,
} from "../../helper/dummyData";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { RouterProps } from "../../helper/types";

const CategoriesDetails = ({ navigation, route }: RouterProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onPressFilter = () => {
    navigation.navigate(screenName.filter);
  };

  const onFashionItem = (item: any) => {
    navigation.navigate(screenName.item_list);
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.fashionContainer}>
        <Text style={styles.fashionNameTextStyle}>
          {getText(string.categories_details.fashion)}
        </Text>
        <FlatList
          horizontal
          data={fashionList}
          renderItem={({ item, index }) => {
            return (
              <FashionItem
                key={index}
                data={item}
                onPressItem={() => onFashionItem(item)}
              />
            );
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        isFilterIcon
        value={searchText}
        onChangeText={setSearchText}
        onPressFilter={onPressFilter}
        containerStyle={{ marginVertical: hp(20) }}
      />
      <TopTabBar
        // @ts-ignore
        sections={categoriesList}
        onPress={setCurrentIndex}
        currentIndex={currentIndex}
        renderTab={(item) => {
          return (
            <TopTabBarItem
              data={item}
              key={item.id}
              containerStyle={{ marginHorizontal: wp(20) }}
            />
          );
        }}
      />
      <ScrollView>
        {ListHeaderComponent()}
        <FlatList
          numColumns={2}
          scrollEnabled={false}
          data={recentlyViewedList}
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          // ListHeaderComponent={ListHeaderComponent}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <RecentlyViewItem key={index} data={item} />;
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fashionContainer: {
    marginTop: hp(16),
    marginLeft: wp(16),
  },
  fashionNameTextStyle: {
    marginTop: hp(5),
    ...commonFontStyle(fontFamily.medium, 18, colors.darkGrey1),
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(20),
  },
});

export default CategoriesDetails;
