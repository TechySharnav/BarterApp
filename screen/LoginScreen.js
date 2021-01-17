import React, { Component } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
} from "react-native";
import { Header } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

import SecurityAnimation from "../component/SecurityAnimation";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
      isVisible: false,
      name: "",
      age: "",
      Address: "",
      phoneNo: "",
      confirmPass: "",
    };
  }

  Login = async () => {
    console.log(this.state);
    var email = this.state.emailID;
    var pwd = this.state.password;

    if (email && pwd) {
      try {
        var response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, pwd);
        if (response) {
          this.props.navigation.navigate("Tab");

          Alert.alert("Success", "Logged in Successfully");
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    } else {
      Alert.alert("Warning", "Enter Email and Password");
    }
  };

  signUp = async () => {
    var email = this.state.emailID;
    var pwd = this.state.password;
    console.log(this.state);

    if (pwd === this.state.confirmPass) {
      if (email && pwd) {
        try {
          var response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, pwd);
          if (response) {
            {
              db.collection("users").add({
                Name: this.state.name,
                Address: this.state.Address,
                Age: this.state.age,
                PhoneNo: this.state.phoneNo,
                Email: this.state.emailID,
              });
            }
            Alert.alert(
              "Success",
              "Registered Successfully. Login to continue"
            );
          }
        } catch (err) {
          Alert.alert("Error", err.message);
        }
      } else {
        Alert.alert("Warning", "Enter Email and Password");
      }
    } else {
      Alert.alert("Error", "Passwords do not match");
    }
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
                  style: {
                    color: "#ecf3f4",
                    fontSize: RFValue(18),
                    fontWeight: "bold",
                  },
                }}
              ></Header>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Name"
                onChangeText={(txt) => {
                  this.setState({ name: txt });
                }}
              ></TextInput>
              <TextInput
                multiline={true}
                style={[
                  styles.textInputStyle,
                  { minHeight: 50, textAlignVertical: "top" },
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
                  marginLeft: 10,
                }}
              >
                <TextInput
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
                value={this.state.emailID}
                style={styles.textInputStyle}
                placeholder="Enter Email"
                onChangeText={(txt) => {
                  this.setState({ name: txt });
                }}
              ></TextInput>
              <TextInput
                secureTextEntry={true}
                value={this.state.password}
                style={styles.textInputStyle}
                placeholder="Enter Password"
                onChangeText={(txt) => {
                  this.setState({ password: txt });
                }}
              ></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.textInputStyle}
                placeholder="Confirm Password"
                onChangeText={(txt) => {
                  this.setState({ confirmPass: txt });
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
                  onPress={this.signUp}
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

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <View style={{ display: "flex", justifyContent: "flex-end" }}>
          <Header
            backgroundColor="#f9688d"
            centerComponent={{
              text: "Barter App",
              style: {
                color: "#ecf3f4",
                fontSize: RFValue(18),
                fontWeight: "bold",
              },
            }}
          ></Header>

          <this.showModal />

          <Text
            style={{
              color: "#534859",
              textAlign: "center",
              fontSize: RFValue(12),
              marginTop: 20,
            }}
          >
            Login/Register to Continue
          </Text>
          <SecurityAnimation></SecurityAnimation>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter Email..."
            onChangeText={(txt) => {
              this.setState({ emailID: txt });
            }}
            style={[styles.textInputStyle, { marginTop: 300 }]}
            placeholderTextColor="#534859"
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter Password..."
            onChangeText={(txt) => {
              this.setState({ password: txt });
            }}
            style={styles.textInputStyle}
            placeholderTextColor="#534859"
          ></TextInput>
          <View
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={styles.buttonStyle} onPress={this.Login}>
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#534859",
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.setState({ isVisible: true })}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#534859",
                  textAlign: "center",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
