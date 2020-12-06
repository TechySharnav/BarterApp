import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";

export default class CustomSideBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.lowerContainer}>
          <Image
            source={require("../assets/logoutIcon.png")}
            style={{
              width: 28,
              height: 28,
              marginLeft: 5,
              tintColor: "#534859",
            }}
          />
          <TouchableOpacity
            style={{
              marginLeft: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate("Login");
              firebase.auth().signOut();
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#534859" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.8,
    paddingTop: 30,
  },
  lowerContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: -120,
    padding: 10,
  },
});
