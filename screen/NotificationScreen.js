import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={{ alignSelf: "center", justifyContent: "center" }}>
        <Text style={{ color: "#534859", marginTop: "85%" }}>
          THIS IS NOTIFICATION SCREEN
        </Text>
      </View>
    );
  }
}
