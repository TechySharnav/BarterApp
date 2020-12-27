import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "../component/MyHeader.js";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import SwipeableFlatList from "../component/SwipeableFlatList";

export default class NotificationScreen extends Component {
  constructor() {
    super();

    this.state = {
      allNotif: [],
      allDocID: [],
      DonorName: "",
      index: 0,
    };
  }
  onSwipeValueChange = (swipeData) => {
    var allNotif = this.state.allNotifications;
    console.log(swipeData);
    const { key, value } = swipeData;
    console.log("Func EXECUTED");
    if (value <= 0) {
      var index = allNotif.findIndex((item) => item.key === key);
      this.state.allNotifications.splice(index, 1);
      this.updateNotificationAsRead(this.state.allDocID[index]);
      this.state.allDocID.splice(index, 1);
    }
  };

  updateNotificationAsRead = async (i) => {
    await db.collection("Requests").doc(i).update({
      notifStatus: "read",
    });
  };

  renderItem = (data) => {
    console.log(this.state.allNotifications, "RenderItem called");
    return (
      <Animated.View>
        <ListItem
          style={{ alignItems: "center", marginTop: 5 }}
          containerStyle={{
            backgroundColor: "#f8d0d0",
            borderColor: "#534859",
            borderWidth: 4,
          }}
          titleStyle={{ color: "#534859", fontWeight: "bold" }}
          title={`Service: ${data.item.RequestedService}`}
          subtitle={
            data.item.Status === "DonorInterested"
              ? this.state.DonorName +
                " has shown Interest in donating this service"
              : this.state.DonorName + " has donated you the service"
          }
        />
      </Animated.View>
    );
  };

  getNotification = async () => {
    var q = await db
      .collection("Requests")
      .where("RequesterEmail", "==", firebase.auth().currentUser.email)
      .where("notifStatus", "==", "unread")
      .get();

    q.docs.map((doc) => {
      this.setState({ allNotif: [...this.state.allNotif, doc.data()] });
      this.setState({ allDocID: [...this.state.allDocID, doc.id] });
    });

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
    if (this.state.allNotif.length <= 0) {
      return (
        <View>
          <MyHeader navigation={this.props.navigation} />

          <Text>No Notifications</Text>

          {/*<FlatList
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
        />*/}
        </View>
      );
    } else {
      return (
        <View>
          <MyHeader navigation={this.props.navigation} />
          <Animated.View>
            <SwipeListView
              onSwipeValueChange={this.onSwipeValueChange}
              data={this.state.allNotif}
              renderItem={this.renderItem}
            />
          </Animated.View>
        </View>
      );
    }
  }
}
