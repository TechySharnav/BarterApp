import React, { Component } from "react";
import { View } from "react-native";
import { Header, Badge, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
  }

  getUnreadNotificationCount = async () => {
    var q = await db
      .collection("Requests")
      .where("RequesterEmail", "==", firebase.auth().currentUser.email)
      .where("notifStatus", "==", "unread")
      .get();

    q.docs.map((doc) => this.setState({ count: this.state.count + 1 }));
  };

  async componentDidMount() {
    await this.getUnreadNotificationCount();
  }

  displayBellwithBadge = () => {
    return (
      <View>
        <Badge
          containerStyle={{
            scaleX: 0.75,
            scaleY: 0.75,
            position: "absolute",
            top: -4,
            left: 4,
            zIndex: 100,
          }}
          badgeStyle={{}}
          value={this.state.count + ""}
        ></Badge>
        <Icon
          name="bell"
          type="font-awesome"
          color="#ecf3f4"
          size={20}
          onPress={() => this.props.navigation.navigate("Notification")}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            color="#ecf3f4"
            type="font-awesome"
            onPress={() => this.props.navigation.openDrawer()}
          />
        }
        backgroundColor="#f9688d"
        centerComponent={{
          text: "Barter App",
          style: { color: "#ecf3f4", fontSize: 18, fontWeight: "bold" },
        }}
        rightComponent={<this.displayBellwithBadge />}
      ></Header>
    );
  }
}
