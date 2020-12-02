import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class offerScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      func: false,
    };
  }

  async componentDidMount() {
    await this.getRequests();
    setTimeout(() => {
      this.setState({ func: true });
    }, 2000);
  }

  getRequests = async () => {
    await db
      .collection("Requests")
      .where("Status", "==", "pending")
      .onSnapshot((query) => {
        query.docs.map(async (doc) => {
          await this.setState({
            allRequests: [...this.state.allRequests, doc.data()],
          });
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor="#f9688d"
          centerComponent={{
            text: "Barter App",
            style: { color: "#ecf3f4", fontSize: 18, fontWeight: "bold" },
          }}
        ></Header>
        <FlatList
          data={this.state.allRequests}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "95%",
                backgroundColor: "#fbd0d0",
                borderColor: "#534859",
                borderWidth: 4,
                padding: 5,
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <Text>
                Name:
                <Text style={{ color: "#534859" }}> {item.Name}</Text>
              </Text>
              <Text style={{ fontSize: 12 }}>
                Good/Service Requested:{" "}
                <Text style={{ fontSize: 12, color: "#534859" }}>
                  {item.RequestedService}
                </Text>
              </Text>
              <Text style={{ fontSize: 12 }}>
                Good/Service in Return:{" "}
                <Text style={{ fontSize: 12, color: "#534859" }}>
                  {item.ReturnService}
                </Text>
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
      </View>
    );
  }
}
