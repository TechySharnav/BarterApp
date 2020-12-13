import React, { Component } from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Header, Card } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class receiverDetailsScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    var detail = this.props.navigation.getParam("ITEM");
    this.setState(detail, () => {
      console.log(this.state);
    });
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
        <Header
          backgroundColor="#f9688d"
          centerComponent={{
            text: "Barter App",
            style: { color: "#ecf3f4", fontSize: 18, fontWeight: "bold" },
          }}
        ></Header>

        <ScrollView contentContainerStyle={{ paddingBottom: 125 }}>
          <Card
            title="Good/Service Information"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          >
            <Card>
              <Text>Requested: {this.state.RequestedService}</Text>
              <Text>In-Return: {this.state.ReturnService}</Text>
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
