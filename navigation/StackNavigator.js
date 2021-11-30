import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { View } from "react-native";
import Welcome from "../components/WelcomeComponent";
import Overview from "../components/Overview";
import Login from "../components/LoginComponent";
import Register from "../components/RegisterComponent";
import Logout from "../components/LogoutComponent";
import Dashboard from "../components/Dashboard";
import ContactUs from "../components/ContactUs";
import About from "../components/AboutComponent";
import LoginLoader from "../components/LoginLoader";
import Setting from "../components/Setting";
import Product from "../components/Product";

const Stack = createStackNavigator();

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <Icon name="menu" size={40} iconStyle={{ color: "white" }} />
      </TouchableOpacity>
    </View>
  );
};

const screenOptionStyle = {
  gestureEnabled: true,
  headerStyle: {
    backgroundColor: "#4682B4",
    height: 100,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  headerTitleStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  headerTitleAlign: "center",
  headerTintColor: "#fff",
  headerMode: "float",
};

function WelcomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
}

function OverviewStackNavigator({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Timeout");
    }, 600000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={{ title: "Overview", headerLeft: ({}) => <HeaderRight /> }}
      />
      <Stack.Screen
        name="Timeout"
        component={LoginLoader}
        options={{ title: "Timeout", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function DashboardStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard", headerLeft: ({}) => <HeaderRight /> }}
      />
    </Stack.Navigator>
  );
}

function ProductStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Products"
        component={Product}
        options={{ title: "Products", headerLeft: ({}) => <HeaderRight /> }}
      />
    </Stack.Navigator>
  );
}

function AboutStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="About Us"
        component={About}
        options={{ title: "About Us", headerLeft: ({}) => <HeaderRight /> }}
      />
    </Stack.Navigator>
  );
}

function ContactStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={{ title: "Contact Us", headerLeft: ({}) => <HeaderRight /> }}
      />
    </Stack.Navigator>
  );
}

function LogoutStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ title: "Logout", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SettingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{ title: "Settings", headerLeft: ({}) => <HeaderRight /> }}
      />
    </Stack.Navigator>
  );
}

export {
  WelcomeStackNavigator,
  OverviewStackNavigator,
  AboutStackNavigator,
  ContactStackNavigator,
  DashboardStackNavigator,
  ProductStackNavigator,
  LogoutStackNavigator,
  SettingsStackNavigator,
};
