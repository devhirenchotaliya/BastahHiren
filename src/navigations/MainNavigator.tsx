import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import React, { FC } from "react";
import StackNavigator from "./StackNavigator";
import { Loader } from "../components";
import { useAppSelector } from "../redux/hooks";

export const navigationRef = createNavigationContainerRef();

const RootContainer: FC = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  return (
    <NavigationContainer ref={navigationRef}>
      <Loader visible={isLoading} />
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootContainer;
