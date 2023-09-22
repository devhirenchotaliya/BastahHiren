//import liraries
import React, { useEffect, useState } from "react";
import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleSheet,
} from "react-native";

import FastImage, { FastImageProps, Source } from "react-native-fast-image";
import { getAsyncToken } from "../../helper/asyncStorage";

type ImageProps = {
  style?: ImageStyle;
  uri: ImageURISource;
  props?: FastImageProps;
  resizeMode?: ImageResizeMode;
};

const MyImage = ({ style, uri, resizeMode, ...props }: ImageProps) => {
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    const getFastImageToken = async () => {
      let token = await getAsyncToken();
      setAuthToken(token || "");
    };
    getFastImageToken();
  }, []);

  let source: Source = {
    uri: uri,
    headers: { Authorization: authToken },
    priority: FastImage.priority.normal,
  };
  return (
    <FastImage
      {...props}
      style={style}
      source={source}
      resizeMode={resizeMode}
    />
  );
};

const styles = StyleSheet.create({});

export default MyImage;
