import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { Header, ListItem } from "react-native-elements";
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
      for (var i in this.state.allRequests) {
        console.log(this.state.allRequests[i].RequesterEmail);
        if (
          this.state.allRequests[i].RequesterEmail ===
          firebase.auth().currentUser.email
        ) {
          this.state.allRequests.splice(i, 1);
        }
      }
    }, 1000);
    setTimeout(() => {
      this.setState({ func: true });
    }, 1000);
  }

  getRequests = async () => {
    this.unsub = await db
      .collection("Requests")
      .where("Status", "==", "pending")
      .onSnapshot(
        (query) => {
          query.docs.map(async (doc) => {
            await this.setState({
              allRequests: [...this.state.allRequests, doc.data()],
            });
          });
        },
        (error) => this.unsub()
      );
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
              title={"Name: " + item.Name}
              subtitle={`Requested: ${item.RequestedService} \nIn Return: ${item.ReturnService}`}
              rightElement={() => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ReceiverDetails", {
                      ITEM: item,
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
