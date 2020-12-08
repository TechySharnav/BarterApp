import React, { Component } from "react";
import SettingsScreen from "../screen/SettingsScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import TabNavigator from "./TabNavigator";
import NotificationScreen from "../screen/NotificationScreen";
import CustomSideBar from "./CustomSideBar";
import { Image } from "react-native";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/homeIcon.png")}
            style={{
              width: 32,
              height: 32,
              tintColor: focused ? "#fbf0e8" : "#534859",
            }}
          />
        ),
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/bell.png")}
            style={{
              width: 32,
              height: 32,
              tintColor: focused ? "#fbf0e8" : "#534859",
            }}
          />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/settings.png")}
            style={{
              width: 32,
              height: 32,
              tintColor: focused ? "#fbf0e8" : "#534859",
            }}
          />
        ),
      },
    },
  },
  {
    contentComponent: CustomSideBar,
    contentOptions: {
      activeTintColor: "#fbf0e8",
      inactiveTintColor: "#534859",
      activeBackgroundColor: "#534859",
      inactiveBackgroundColor: "transparent",
    },
  },
  {
    initialRouteName: "Home",
  }
);

export default DrawerNavigator;
