import React, { Component } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import SettingsScreen from "../screen/SettingsScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import TabNavigator from "./TabNavigator";
import NotificationScreen from "../screen/NotificationScreen";
import CustomSideBar from "./CustomSideBar";
import { Image } from "react-native";
import MyOfferScreen from "../screen/MyOfferingScreen";
import MyReceivedServiceScreen from "../screen/MyReceivedServiceScreen";
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
    MyOffer: {
      screen: MyOfferScreen,
      navigationOptions: {
        title: "My Offerings",
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/hand_offer.png")}
            style={{
              resizeMode: "contain",
              width: 32,
              height: 32,
              tintColor: focused ? "#fbf0e8" : "#534859",
            }}
          />
        ),
      },
    },
    ReceivedService: { screen: MyReceivedServiceScreen },
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
