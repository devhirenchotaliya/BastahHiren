import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import {
  AuthHeader,
  PrimaryButton,
  RangeSliderView,
  SizeItem,
} from "../../components";
import {
  RouterProps,
  RowWithLabelViewAllProps,
  WrapListProps,
} from "../../helper/types";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFilterData, setFilterData } from "../../actions";

const Filter = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { filterData } = useAppSelector((state) => state.filter);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [priceTo, setPriceTo] = useState<number>();
  const [priceFrom, setPriceFrom] = useState<number>();

  useEffect(() => {
    if (Object.keys(filterData)?.length > 0) {
      setPriceTo(filterData?.max_price);
      setPriceFrom(filterData?.min_price);
    } else {
      getFilterAllData();
    }
  }, []);

  const getFilterAllData = () => {
    dispatch(
      getFilterData((response: any) => {
        setPriceTo(response?.max_price);
        setPriceFrom(response?.min_price);
        setSelectedSize("");
      })
    );
  };

  const onSizeItemPress = (item: any) => {
    if (selectedSize === item) {
      setSelectedSize("");
    } else {
      setSelectedSize(item);
    }
  };

  const RowWithLabelViewAll = ({
    label,
    onPressViewAll,
    isHideViewAll,
  }: RowWithLabelViewAllProps) => {
    return (
      <View style={styles.rowSpaceStyle}>
        <Text style={styles.labelTextStyle}>{label}</Text>
        {!isHideViewAll && (
          <Text onPress={onPressViewAll} style={styles.viewAllTextStyle}>
            {getText(string.filter.view_all)}
          </Text>
        )}
      </View>
    );
  };

  const WrapList = ({ data, onItemPress, keyName }: WrapListProps) => {
    return (
      <View style={styles.rowWrapStyle}>
        {data?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                ...styles.itemContainer,
                backgroundColor: item.isSelected
                  ? colors.grey
                  : colors.whiteBrown,
              }}
              onPress={() => onItemPress(item)}
            >
              <Text
                style={{
                  ...styles.itemLabelTextStyle,
                  color: item.isSelected ? colors.white : colors.primary,
                }}
              >
                {item[keyName || ""]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const onPressSelectItem = (data: any, item: any) => {
    data?.map((i: any) => {
      if (item.id === i.id) {
        i.isSelected = !i.isSelected;
      }
    });
    dispatch(setFilterData(filterData));
  };

  const onPressApplyFilter = () => {
    let categories: any = [];
    let brands: any = [];
    let groups: any = [];
    let filterCategories = filterData?.categories?.filter(
      (i: any) => i.isSelected
    );
    filterCategories.map((item: any, index: number) => {
      let obj = {
        [`categories[${index}]`]: item.id,
      };
      categories.push(obj);
    });
    let filterBrand = filterData?.sellers?.filter((i: any) => i.isSelected);
    filterBrand.map((item: any, index: number) => {
      let obj = {
        [`brands[${index}]`]: item.id,
      };
      brands.push(obj);
    });
    let filterGroups = filterData?.groups?.filter((i: any) => i.isSelected);
    filterGroups.map((item: any, index: number) => {
      let obj = {
        [`groups[${index}]`]: item.id,
      };
      groups.push(obj);
    });
    let data = [
      ...categories,
      ...brands,
      ...groups,
      { price_to: priceTo },
      { price_from: priceFrom },
    ];
    if (selectedSize?.length > 0) {
      data.push({ size: selectedSize });
    }
    route?.params?.getFilterFormData(data);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        onPressClearAll={getFilterAllData}
        isClearIcon
        title={getText(string.filter.filter)}
      />
      <ScrollView style={styles.innerContainer}>
        <RowWithLabelViewAll
          isHideViewAll
          label={getText(string.filter.categories)}
        />
        <WrapList
          keyName={"name"}
          data={filterData?.categories}
          onItemPress={(item) =>
            onPressSelectItem(filterData?.categories, item)
          }
        />
        <RowWithLabelViewAll
          isHideViewAll
          label={getText(string.filter.brand)}
        />
        <WrapList
          keyName={"store_name"}
          data={filterData?.sellers}
          onItemPress={(item) => onPressSelectItem(filterData?.sellers, item)}
        />
        <RowWithLabelViewAll
          isHideViewAll
          label={getText(string.filter.price_range)}
        />
        {/* <RnRangeSlider
          step={1}
          min={min}
          max={max}
          renderRail={renderRail}
          renderThumb={renderThumb}
          disableRange={rangeDisabled}
          floatingLabel={floatingLabel}
          style={styles.silderContainer}
          onValueChanged={handleValueChange}
          renderRailSelected={renderRailSelected}
        /> */}
        <RangeSliderView
          min={filterData?.min_price}
          max={filterData?.max_price}
          onValuesChange={(value) => {
            setPriceFrom(value[0]);
            setPriceTo(value[1]);
          }}
        />
        <View style={{ height: hp(10) }} />
        <RowWithLabelViewAll
          isHideViewAll
          label={getText(string.filter.size)}
        />
        <FlatList
          numColumns={4}
          data={filterData?.sizes}
          scrollEnabled={false}
          keyExtractor={(item) => "_" + item}
          renderItem={({ item, index }) => {
            return (
              <SizeItem
                key={index}
                data={item}
                onlyItem={true}
                selected={selectedSize}
                onPressItem={() => onSizeItemPress(item)}
                containerStyle={{ marginRight: wp(10), marginBottom: hp(5) }}
              />
            );
          }}
        />
        <RowWithLabelViewAll
          isHideViewAll
          label={getText(string.filter.best_product)}
        />
        <WrapList
          keyName="name"
          data={filterData?.groups}
          onItemPress={(item) => onPressSelectItem(filterData?.groups, item)}
        />
        <PrimaryButton
          onPress={onPressApplyFilter}
          containerStyle={styles.buttonContainer}
          label={getText(string.filter.apply_filter)}
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
  innerContainer: {
    paddingHorizontal: wp(16),
  },
  rowSpaceStyle: {
    marginTop: hp(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.medium, 19, colors.primary),
  },
  viewAllTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.grey),
  },
  rowWrapStyle: {
    flexWrap: "wrap",
    marginTop: hp(20),
    flexDirection: "row",
    marginVertical: hp(3),
  },
  itemContainer: {
    borderRadius: wp(5),
    marginRight: wp(10),
    marginBottom: hp(12),
    paddingVertical: wp(12),
    paddingHorizontal: wp(18),
    backgroundColor: colors.whiteBrown,
  },
  itemLabelTextStyle: {
    ...commonFontStyle(fontFamily.medium, 14, colors.primary),
  },
  silderContainer: {
    paddingHorizontal: wp(18),
    marginVertical: hp(20),
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: wp(216),
    alignSelf: "center",
    marginVertical: hp(30),
  },
});

export default Filter;
