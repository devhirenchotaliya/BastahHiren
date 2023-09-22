import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import { AuthHeader, NoDataFound, NotificationItem } from "../../components";
import { getText } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearAllNotifications, getNotifications } from "../../actions";

const Notification = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { notificationList } = useAppSelector((state) => state.common);
  const [isData, setIsData] = useState<boolean>(true);

  useEffect(() => {
    getNotificationsList();
  }, []);

  const getNotificationsList = () => {
    dispatch(getNotifications((isData) => setIsData(isData)));
  };

  const onPressClearAll = () => {
    let request = {
      onSuccess: () => getNotificationsList(),
      onFailure: () => {},
    };
    dispatch(clearAllNotifications(request));
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader
        onPressClearAll={onPressClearAll}
        title={getText(string.notifications.notification)}
        isClearIcon={notificationList?.length ? true : false}
      />
      {isData ? (
        <FlatList
          data={notificationList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <NotificationItem key={index} data={item} />;
          }}
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
});

export default Notification;
