import React, { useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Import GestureHandlerRootView
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  )
};

export default App;