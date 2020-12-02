import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

var name;

export default class requestScreen extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Age: "",
      Address: "",
      RequiredServiceName: "",
      ReturnServiceName: "",
      PhoneNo: "",
      isVisible: false,
      Status: "pending",
      allRequests: [],
      func: false,
      buttonDisabled: true,
    };
  }

  getRequests = async () => {
    var email = await firebase.auth().currentUser.email;
    var query = await db
      .collection("Requests")
      .where("RequesterEmail", "==", email)
      .onSnapshot((query) => {
        query.docs.map(async (doc) => {
          await this.setState({
            allRequests: [...this.state.allRequests, doc.data()],
          });
        });
      });
  };

  getDetails = async () => {
    var email = await firebase.auth().currentUser.email;
    var query = await db.collection("users").where("Email", "==", email).get();

    query.docs.map(async (doc) => {
      await this.setState(doc.data());
    });
  };

  submitRequest = async () => {
    await db.collection("Requests").add({
      RequestedService: this.state.RequiredServiceName,
      ReturnService: this.state.ReturnServiceName,
      RequesterEmail: firebase.auth().currentUser.email,
      Address: this.state.Address,
      Status: "pending",
      Name: this.state.Name,
    });
    Alert.alert("Success", "Request Added Successfully");
    this.setState({ isVisible: false });
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isVisible}
        transparent={!this.state.isVisible}
        animationType="slide"
      >
        <ScrollView>
          <KeyboardAvoidingView style={{ flex: 1 }} enabled>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Header
                backgroundColor="#f9688d"
                centerComponent={{
                  text: "Barter App",
                  style: { color: "#ecf3f4", fontSize: 18, fontWeight: "bold" },
                }}
              ></Header>
              <TextInput
                onChangeText={(txt) => {
                  this.setState({ name: txt });
                }}
                value={this.state.Name}
                style={styles.textInputStyle}
                placeholder="Enter Name"
              ></TextInput>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 10,
                }}
              >
                <TextInput
                  value={this.state.Age}
                  keyboardType="number-pad"
                  style={[
                    styles.textInputStyle,
                    { width: 100, marginRight: 20 },
                  ]}
                  placeholder="Age"
                  onChangeText={(txt) => {
                    this.setState({ age: txt });
                  }}
                ></TextInput>
                <TextInput
                  value={this.state.PhoneNo}
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={[styles.textInputStyle, { width: 220 }]}
                  placeholder="PhoneNo"
                  onChangeText={(txt) => {
                    this.setState({ phoneNo: txt });
                  }}
                ></TextInput>
              </View>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Good/Service You Require"
                onChangeText={(txt) => {
                  this.setState({ RequiredServiceName: txt });
                }}
              ></TextInput>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Good/Service You give in Return"
                onChangeText={(txt) => {
                  this.setState({ ReturnServiceName: txt });
                }}
              ></TextInput>
              <TextInput
                value={this.state.Address}
                multiline={true}
                style={[
                  styles.textInputStyle,
                  { minHeight: 100, textAlignVertical: "top" },
                ]}
                placeholder="Enter Address"
                onChangeText={(txt) => {
                  this.setState({ Address: txt });
                }}
              ></TextInput>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.setState({ isVisible: false })}
                >
                  <Text
                    style={{
                      textTransform: "uppercase",
                      color: "#534859",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={this.submitRequest}
                >
                  <Text
                    style={{
                      textTransform: "uppercase",
                      color: "#534859",
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  };

  async componentDidMount() {
    await this.getDetails();
    await this.getRequests();
    setTimeout(() => {
      this.setState({ func: true });
      this.setState({ buttonDisabled: false });
      for (var i in this.state.allRequests) {
        if (this.state.allRequests[i].Status === "pending") {
          this.setState({ buttonDisabled: true });
        }
      }
      name = this.state.Name;
    }, 2000);

    this.forceUpdate();
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
        <this.showModal />
        <TouchableOpacity
          disabled={this.state.buttonDisabled}
          onPress={() => {
            this.setState({ isVisible: true });
          }}
          style={{
            alignSelf: "center",
            backgroundColor: "#fbd0d0",
            width: "60%",
            margin: 10,
            marginTop: 20,
            borderColor: "#534859",
            borderWidth: 2,
            padding: 10,
            opacity: this.state.buttonDisabled ? 0.5 : 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#534859" }}>
            + Add request
          </Text>
        </TouchableOpacity>

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
                opacity: item.Status === "pending" ? 0.5 : 1,
                marginTop: 10,
              }}
            >
              <Text>
                Name:
                <Text style={{ color: "#534859" }}> {name}</Text>
              </Text>
              <Text style={{ fontSize: 12 }}>
                Good/Service Requested:{" "}
                <Text style={{ fontSize: 12, color: "#534859" }}>
                  {item.RequestedService}
                </Text>
              </Text>
              <Text>
                Status: <Text style={{ color: "#534859" }}> {item.Status}</Text>
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

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: "#fbf0e8",
    padding: 10,
    width: "95%",
    alignSelf: "center",
    borderColor: "#534859",
    borderWidth: 4,
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "#fbd0d0",
    padding: 10,
    width: "45%",
    margin: 10,
    marginTop: 20,
    borderColor: "#534859",
    borderWidth: 2,
  },
});