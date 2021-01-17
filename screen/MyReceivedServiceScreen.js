import React, { Component } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Header, ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../component/MyHeader";

export default class MyReceivedServiceScreen extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: false,
      Name: "",
      bookName: "",
      authorName: "",
      reason: "",
      Address: "",
      Age: "",
      PhoneNo: "",
      Email: "",
      Status: "pending",
      btnDisabled: true,
      func: false,
      allRequests: [],
      allDocID: [],
      index: null,
    };
  }

  getRequests = async () => {
    var email = await firebase.auth().currentUser.email;
    this.unsub = await db
      .collection("Requests")
      .where("RequesterEmail", "==", email)
      .where("Status", "==", "received")
      .onSnapshot(
        (query) => {
          query.docs.map(async (doc) => {
            await this.setState({
              allRequests: [...this.state.allRequests, doc.data()],
              allDocID: [...this.state.allDocID, doc.id],
            });
          });
        },
        (error) => this.unsub()
      );
  };

  async componentDidMount() {
    await this.getRequests();

    setTimeout(() => {
      this.setState({ func: true });
      this.setState({ btnDisabled: false });
    }, 2000);
  }

  submitRequest = async () => {
    db.collection("Requests").add({
      AuthorName: this.state.authorName,
      BookName: this.state.bookName,
      DeliverAddress: this.state.Address,
      RequesterEmail: this.state.Email,
      Reason: this.state.reason,
      Status: this.state.Status,
      Name: this.state.Name,
      UID: eval(this.generateUID()),
    });
    Alert.alert("Success", "Request Submitted Successfully");
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} />

        <FlatList
          data={this.state.allRequests}
          renderItem={({ item, index }) => (
            <ListItem
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
              containerStyle={{
                backgroundColor: "#f8d0d0",
                borderColor: "#534859",
                borderWidth: 4,
                opacity: item.Status !== "received" ? 0.5 : 1,
              }}
              titleStyle={{ color: "#534859", fontWeight: "bold" }}
              title={`Service: ${item.RequestedService}`}
              subtitle={`Status: ${item.Status}`}
              rightElement={() => (
                <TouchableOpacity>
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

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: "#c4dcdf",
    padding: 10,
    width: "95%",
    alignSelf: "center",
    borderColor: "#729ca2",
    borderWidth: 2,
    marginTop: 20,
  },
});
