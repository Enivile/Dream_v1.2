import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "../screens/LoaderScreen";
import VideoScreen from "../screens/VideoScreen";
import HomeNavigator from "./HomeNavigator";
import MultiSoundPlayer from "../screens/Player/MultiSoundPlayer";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loader">
        <Stack.Screen name="Loader" component={LoaderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={HomeNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Player" component={MultiSoundPlayer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
