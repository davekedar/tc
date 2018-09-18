import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";
import { createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import CalenderScreen from './CalenderScreen';
import ChatScreen from './ChatScreen';
import SettingScreen from './SettingScreen';
import UpdateScreen from './UpdateScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeScreenTabs = createBottomTabNavigator({
    ProfileScreen : {
        screen : ProfileScreen,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='ios-person' size={24} color={tintColor}/>
            )
        }
    },
    CalenderScreen : {
        screen : CalenderScreen,
        navigationOptions: {
            tabBarLabel: "Calender",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-calendar' size={24} color={tintColor}/>
            )
        }
    },
    ChatScreen : {
        screen : ChatScreen,
        navigationOptions: {
            tabBarLabel: "Chat",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-chatbubbles' size={24} color={tintColor}/>
            )
        }
    },
    UpdateScreen : {
        screen : UpdateScreen,
        navigationOptions: {
            tabBarLabel: "Update",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-notifications' size={24} color={tintColor}/>
            )
        }
    },
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: "Settings",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-cog' size={24} color={tintColor}/>
            )
        }
    },
},{
    tabBarOptions: {
        activeTintColor: '#8E44AD',
        inactiveTintColor: 'grey'
    }
})

// class HomeScreenTabs extends Component{
//     render(){
//         return (
//             <View style={styles.container}>
//                 <Text>HomeScreenTabs</Text>
//             </View>
//         );
//     }
// }
export default HomeScreenTabs;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});