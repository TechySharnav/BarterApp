import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import MyHeader from "../component/MyHeader.js";

import db from "../config";
import firebase from "firebase";

export default class SettingsScreen extends Component {
  constructor() {
    super();

    this.state = {
      Address: "",
      Name: "",
      Age: "",
      PhoneNo: "",
      docID: null,
      func: false,
    };
  }

  getData = async () => {
    var email = firebase.auth().currentUser.email;
    var query = await db.collection("users").where("Email", "==", email).get();

    query.docs.map(async (doc) => {
      await this.setState(doc.data());
      this.setState({ docID: doc.id });
    });
    console.log(this.state);
  };

  submitData = async () => {
    db.collection("users")
      .doc(this.state.docID)
      .update({
        Name: this.state.Name,
        Age: this.state.Age,
        Address: this.state.Address,
        PhoneNo: this.state.PhoneNo,
      })
      .then(() => {
        Alert.alert("Success", "Record Updated Successfully");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  async componentDidMount() {
    await this.getData();
    setTimeout(() => {
      this.setState({ func: true });
    }, 1000);
  }

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} />
        <TextInput
          onChangeText={(txt) => {
            this.setState({ Name: txt });
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
            style={[styles.textInputStyle, { width: 100, marginRight: 20 }]}
            placeholder="Age"
            onChangeText={(txt) => {
              this.setState({ Age: txt });
            }}
          ></TextInput>
          <TextInput
            value={this.state.PhoneNo}
            keyboardType="phone-pad"
            maxLength={10}
            style={[styles.textInputStyle, { width: 220 }]}
            placeholder="PhoneNo"
            onChangeText={(txt) => {
              this.setState({ PhoneNo: txt });
            }}
          ></TextInput>
        </View>

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
            onPress={this.submitData}
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
