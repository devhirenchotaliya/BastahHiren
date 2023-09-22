//import liraries
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "../../theme/Icons";
import { wp } from "../../helper/globalFunctions";
import { RatingViewProps } from "../../helper/types";

const RatingView = ({ onStarPress, rating }: RatingViewProps) => {
  return (
    <FlatList
      bounces={false}
      horizontal
      data={[0, 1, 2, 3, 4]}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => onStarPress(index)}
          >
            <Image
              resizeMode="contain"
              style={{
                ...styles.starIconStyle,
                tintColor: index < rating ? "#eb9b34" : "#E4E4E4",
              }}
              source={icons.star}
            />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: wp(4),
  },
  starIconStyle: {
    margin: wp(3),
    width: wp(33),
    height: wp(33),
  },
});

export default RatingView;
