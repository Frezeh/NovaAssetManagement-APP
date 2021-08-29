import React, { useEffect, Component } from "react";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_400Regular, } from '@expo-google-fonts/ubuntu';
import TabNavigator from "./TabNavigator";
import { WelcomeStackNavigator, DashboardStackNavigator, ExchangeTradedFundStackNavigator, MoneyMarketFundStackNavigator, NovaDollarFundStackNavigator, AboutStackNavigator, ContactStackNavigator, AdvisoryStackNavigator, TransactionsStackNavigator, LogoutStackNavigator, SettingsStackNavigator, ProductStackNavigator } from "./StackNavigator";

export default function DrawerNavigator() {

  const auth = useSelector(state => state.auth);

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  const Drawer = createDrawerNavigator();

  const styles = StyleSheet.create({
    drawerHeader: {
      backgroundColor: '#4682B4',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      marginTop: 10,
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    drawerHeaderSubText: {
      marginBottom: 10,
      color: "#fff"
    },
    drawerImage: {
      marginTop: 20,
      width: 80,
      height: 80,
      borderRadius: 40
    },
  });

  const CustomDrawerContent = (props) => {
    if (!auth.isAuthenticated) {
      return (       
        <DrawerContentScrollView {...props}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
           {/*  <View style={styles.drawerHeader}>
              <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/avatar.png')} style={styles.drawerImage} />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}> Frank Ezeh </Text>
                <Text style={styles.drawerHeaderSubText}> 2060173676 </Text>
              </View>
            </View> */}
            <DrawerItemList {...props} />
          </SafeAreaView>
        </DrawerContentScrollView>
      );
    }

    else {
      return (
        <DrawerContentScrollView {...props}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
              <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/profile.png')} style={styles.drawerImage} />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}> {auth.user.username} </Text>
                <Text style={styles.drawerHeaderSubText}> 0078675645 </Text>
              </View>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        </DrawerContentScrollView>
      );
    }
  }


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (

      <Drawer.Navigator initialRouteName='Overview' drawerStyle={{ backgroundColor: '#fff' }} drawerContent={props => <CustomDrawerContent {...props} />} drawerContentOptions={{ activeTintColor: '#4682B4', inactiveTintColor: 'gray', }}>
        {!auth.isAuthenticated ? (
          <>
            <Drawer.Screen name="Login" component={WelcomeStackNavigator} options={{
              title: 'Login',
              drawerLabel: 'Login',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='sign-in'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Overview" component={TabNavigator} options={{
              title: 'Overview',
              drawerLabel: 'Overview',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='th'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }}
            />
            <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={{
              title: 'Dashboard',
              drawerLabel: 'Dashboard',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='bar-chart'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="Products" component={ProductStackNavigator} options={{
              title: 'Products',
              drawerLabel: 'Products',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='shopping-basket'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="Settings" component={SettingsStackNavigator} options={{
              title: 'Settings',
              drawerLabel: 'Settings',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='cog'
                  type='font-awesome'
                  size={22}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="About" component={AboutStackNavigator} options={{
              title: 'About Us',
              drawerLabel: 'About Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="Contact Us" component={ContactStackNavigator} options={{
              title: 'Contact Us',
              drawerLabel: 'Contact Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'
                  size={22}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="Logout" component={LogoutStackNavigator} options={{
              title: 'Logout',
              drawerLabel: 'Logout',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='sign-out'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }} />
          </>
        )}
      </Drawer.Navigator>
    );
  }
}
