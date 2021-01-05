import React, { Component } from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Header, Card } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../component/MyHeader.js";

export default class receiverDetailsScreen extends Component {
  constructor() {
    super();
    this.state = { Price: null };
  }

  componentDidMount() {
    var detail = this.props.navigation.getParam("ITEM");
    var INRPRICE = this.props.navigation.getParam("INRPrice");
    this.setState(detail, () => {
      console.log(this.state);
    });

    this.setState({ Price: INRPRICE });
  }

  updateStatus = async () => {
    var q = await db
      .collection("Requests")
      .where("UID", "==", this.state.UID)
      .get();

    await q.docs.map(async (doc) => {
      this.setState({ docID: doc.id });
    });

    setTimeout(async () => {
      await db.collection("Requests").doc(this.state.docID).update({
        Status: "DonorInterested",
        DonorEmail: firebase.auth().currentUser.email,
        notifStatus: "unread",
      });
    }, 1000);
    Alert.alert(
      "Success",
      "Thanks for Showing interest in Donating this Good/Service!"
    );
  };

  render() {
    var fromMyOfferScreen = this.props.navigation.getParam("FromMyOfferScreen");
    return (
      <View>
        <MyHeader navigation={this.props.navigation} />

        <ScrollView contentContainerStyle={{ paddingBottom: 125 }}>
          <Card
            title="Good/Service Information"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          >
            <Card>
              <Text>Requested: {this.state.RequestedService}</Text>
              <Text>In-Return: {this.state.ReturnService}</Text>
              <Text>Price: {this.state.Price}</Text>
            </Card>
          </Card>
          <Card
            title="Requester Information"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          >
            <Card>
              <Text>Name: {this.state.Name}</Text>
              <Text>Address: {this.state.Address}</Text>
              <Text>Email: {this.state.RequesterEmail}</Text>
            </Card>
          </Card>
          <TouchableOpacity
            disabled={fromMyOfferScreen}
            onPress={() => {
              this.updateStatus();
            }}
            style={{
              backgroundColor: "#fbd0d0",
              alignSelf: "center",
              padding: 10,
              width: "75%",
              margin: 10,
              marginTop: 30,
              borderColor: "#534859",
              borderWidth: 4,
              opacity: fromMyOfferScreen ? 0.5 : 1,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#534859",
                textAlign: "center",
              }}
            >
              I WANT TO DONATE!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
