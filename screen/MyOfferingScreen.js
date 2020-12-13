import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import db from "../config";
import { Header, ListItem } from "react-native-elements";
import firebase from "firebase";

export default class MyOfferScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      func: false,
    };
  }

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
        <Header
          backgroundColor="#f9688d"
          centerComponent={{
            text: "Barter App",
            style: { color: "#ecf3f4", fontSize: 18, fontWeight: "bold" },
          }}
        ></Header>
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
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
      </View>
    );
  }
}
