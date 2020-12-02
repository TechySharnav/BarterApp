import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screen/LoginScreen";
import requestScreen from "./screen/requestScreen";
import offerScreen from "./screen/offerScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Offer: { screen: offerScreen },
    Request: { screen: requestScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === "Request") {
          return (
            <Image
              source={require("./assets/request.png")}
              style={{ width: 20, height: 20, marginTop: 5, tintColor: "blue" }}
            />
          );
        } else if (routeName === "Offer") {
          return (
            <Image
              source={require("./assets/offer.png")}
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

const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Tab: { screen: TabNavigator },
});

const AppContainer = createAppContainer(AppNavigator);
