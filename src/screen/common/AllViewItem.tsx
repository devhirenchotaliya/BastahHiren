import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import { AuthHeader, RecentlyViewItem } from "../../components";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { SafeAreaView } from "react-native-safe-area-context";

const AllViewItem = ({ navigation, route }: RouterProps) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={route?.params?.headerTitle} />
      <FlatList
        numColumns={2}
        style={styles.listContainer}
        data={route?.params?.listItems || []}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapperStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <RecentlyViewItem key={index} data={item?.item || item} />;
        }}
        ListFooterComponent={<View style={{ height: hp(20) }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgStyle: {
    height: wp(130),
    width: wp(130),
    alignSelf: "center",
    borderRadius: wp(130 / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconStyle: {
    height: hp(40),
    width: wp(49),
  },
  buttonContainer: {
    marginHorizontal: wp(25),
    marginTop: hp(40),
  },
  deleteButtonContainer: {
    marginHorizontal: wp(25),
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(10),
  },
});

export default AllViewItem;
