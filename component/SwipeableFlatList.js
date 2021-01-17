import React, { Component } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Dimensions, Animated } from "react-native";
import { ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class SwipableFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotifications: this.props.allNotifications,
      func: false,
      allDocID: this.props.allDocID,
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ func: true });
    }, 3000);
  }

  renderItem = (data) => {
    console.log("RenderItem called");
    return (
      <Animated.View>
        <ListItem
          style={{ alignItems: "center", marginTop: 5 }}
          containerStyle={{
            backgroundColor: "#c4dcdf",
            alignItems: "center",
            borderWidth: 4,
            borderColor: "#729ca2",
            width: "98%",
          }}
          titleStyle={{ color: "#465461", fontWeight: "bold" }}
          title={`Book: ${data.item.BookName}`}
          subtitle={
            data.item.Status === "DonorInterested"
              ? this.props.donor + " has shown Interest in donating this book"
              : this.props.donor + " has donated you the book"
          }
        />
      </Animated.View>
    );
  };

  render() {
    return (
      <View style={{ backgroundColor: "blue" }}>
        <SwipeListView
          onSwipeValueChange={this.onSwipeValueChange}
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    );
  }
}
