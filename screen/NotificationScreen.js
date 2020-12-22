import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "../component/MyHeader.js";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native";

export default class NotificationScreen extends Component {
  constructor() {
    super();

    this.state = {
      allNotif: [],
      DonorName: "",
      index: 0,
    };
  }
  AskUserforServiceReceived = () => {
    Alert.alert("Warning", "Did you received the Service?", [
      { text: "No" },
      { text: "Yes" },
    ]);
  };

  getNotification = async () => {
    var q = await db
      .collection("Requests")
      .where("RequesterEmail", "==", firebase.auth().currentUser.email)
      .where("notifStatus", "==", "unread")
      .get();

    q.docs.map((doc) =>
      this.setState({ allNotif: [...this.state.allNotif, doc.data()] })
    );

    for (var i in this.state.allNotif) {
      if (this.state.allNotif[i].Status === "DonorInterested") {
        this.setState({ DonorName: this.state.allNotif[i].DonorEmail });
      }
    }

    var v = await db
      .collection("users")
      .where("Email", "==", this.state.DonorName)
      .get();

    v.docs.map((doc) => this.setState({ DonorName: doc.data().Name }));
  };

  async componentDidMount() {
    await this.getNotification();
    setTimeout(() => {
      this.setState({ func: true });
    }, 3000);
  }

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} />
        <FlatList
          contentContainerStyle={{
            alignSelf: "center",
            borderWidth: 4,
            borderColor: "#534859",
            width: "98%",
            marginTop: 5,
          }}
          data={this.state.allNotif}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={this.AskUserforServiceReceived}>
              <ListItem
                containerStyle={{ backgroundColor: "#f8d0d0" }}
                titleStyle={{ color: "#534859", fontWeight: "bold" }}
                title={"Service: " + item.RequestedService}
                subtitle={
                  this.state.DonorName +
                  ` has shown interest in donating you this service/good.`
                }
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
      </View>
    );
  }
}
