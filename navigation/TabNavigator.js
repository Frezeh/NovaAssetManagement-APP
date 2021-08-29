import React from "react"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { Icon } from 'react-native-elements';
import { OverviewStackNavigator, ExchangeTradedFundStackNavigator, MoneyMarketFundStackNavigator, NovaDollarFundStackNavigator, AdvisoryStackNavigator, DashboardStackNavigator, SettingsStackNavigator, ProductStackNavigator, ContactStackNavigator } from "./StackNavigator";


const Tab = createBottomTabNavigator(); 

const BottomTabNavigator = () => { 
    return ( 
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName; 

            if (route.name === 'Overview') {            
            iconName = focused ? 'th'  : 'th';
            
            } else if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-chart' : 'bar-chart';

            } else if (route.name === 'Products') {
                iconName = focused ? 'shopping-basket' : 'shopping-basket';
            
            } else if (route.name === 'Contact') {
                iconName = focused ? 'address-card' : 'address-card';
            
            } else if (route.name === 'Settings') {
                iconName = focused ? 'cog' : 'cog';           
            } 
            
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
            },
        })}    
            tabBarOptions={{          
            activeTintColor: '#4682B4',
            inactiveTintColor: 'gray',
        }}    
        >
            <Tab.Screen name="Overview" component={OverviewStackNavigator} />
            <Tab.Screen name="Dashboard" component={DashboardStackNavigator} />
            <Tab.Screen name="Products" component={ProductStackNavigator} />
            <Tab.Screen name="Contact" component={ContactStackNavigator} />           
            <Tab.Screen name="Settings" component={SettingsStackNavigator} />
        </Tab.Navigator> 
    ); 
}; 
    
export default BottomTabNavigator;

