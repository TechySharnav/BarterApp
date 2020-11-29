import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screen/LoginScreen";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
});

const AppContainer = createAppContainer(AppNavigator);
