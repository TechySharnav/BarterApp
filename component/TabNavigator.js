import React, { Component } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { Image } from "react-native";
import requestScreen from "../screen/requestScreen";
import StackNavigator from "./StackNavigator";
import { createBottomTabNavigator } from "react-navigation-tabs";

const TabNavigator = createBottomTabNavigator(
  {
    Offer: { screen: StackNavigator },
    Request: { screen: requestScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === "Request") {
          return (
            <Image
              source={require("../assets/request.png")}
              style={{ width: 20, height: 20, marginTop: 5, tintColor: "blue" }}
            />
          );
        } else if (routeName === "Offer") {
          return (
            <Image
              source={require("../assets/offer.png")}
              style={{ height: 20, marginTop: 5, resizeMode: "contain" }}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: "#f9688d",
      inactiveTintColor: "#534859",
    },
  }
);

export default TabNavigator;
