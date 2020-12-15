import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screen/LoginScreen";
import DrawerNavigator from "./component/DrawerNavigator";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Tab: { screen: DrawerNavigator },
});

const AppContainer = createAppContainer(AppNavigator);
