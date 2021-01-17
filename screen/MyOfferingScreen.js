import React, { Component } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { View, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import db from "../config";
import { ListItem } from "react-native-elements";
import MyHeader from "../component/MyHeader.js";
import firebase from "firebase";

export default class MyOfferScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      func: false,
    };
  }

  AskUserforReturnServiceReceived = () => {
    Alert.alert("Warning", "Did you received the Return Service?", [
      { text: "No" },
      { text: "Yes" },
    ]);
  };

  fetchRequests = async () => {
    this.unsub = await db
      .collection("Requests")
      .where("DonorEmail", "==", firebase.auth().currentUser.email)
      .onSnapshot(
        (snapshot) => {
          snapshot.docs.map(async (doc) => {
            await this.setState({
              allRequests: [...this.state.allRequests, doc.data()],
            });
          });
        },
        (error) => this.unsub()
      );
  };

  async componentDidMount() {
    await this.fetchRequests();
    await setTimeout(() => {
      this.setState({ func: true });
      console.log(this.state, "mount");
    }, 2000);
  }

  componentWillUnmount() {
    this.unsub();
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
          data={this.state.allRequests}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={this.AskUserforReturnServiceReceived}>
              <ListItem
                containerStyle={{ backgroundColor: "#f8d0d0" }}
                titleStyle={{ color: "#534859", fontWeight: "bold" }}
                titleStyle={{ color: "#465461", fontWeight: "bold" }}
                title={`Name: ${item.Name}`}
                subtitle={`Service: ${item.RequestedService}`}
                rightElement={() => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ReceiverDetails", {
                        ITEM: item,
                        FromMyOfferScreen: true,
                      })
                    }
                  >
                    <Text>View</Text>
                  </TouchableOpacity>
                )}
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
