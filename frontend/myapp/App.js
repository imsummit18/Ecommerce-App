import React from "react";
import { StatusBar } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import StackNavigator from "./src/navigations/StackNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { ModalPortal } from "react-native-modals";
import { AppProvider } from "./src/context/userContext";

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <StackNavigator />
        <ModalPortal />
      </AppProvider>
    </Provider>
  );
};

export default App;
