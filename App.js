import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { Loading } from "./components/LoadingComponent";
import { NavigationContainer } from "@react-navigation/native";

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  images: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
