import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "../component/MyHeader.js";
import db from "../config";
import firebase from "firebase";

export default class offerScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      currencyObj: {},
      func: false,
    };
  }

  getExchangeRates = async () => {
    var obj;
    await fetch(
      "http://data.fixer.io/api/latest?access_key=004847c48f311a38d719e4a7a01a52fc&format=1"
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        obj = resData.rates;
      });
    this.setState({ currencyObj: obj });
    console.log(this.state.currencyObj);
  };

  generatePrice = (code, price) => {
    if (this.state.currencyObj !== {}) {
      var INRPrice =
        (price / this.state.currencyObj[code]) * this.state.currencyObj["INR"];
      INRPrice = INRPrice.toFixed(2);
      return <Text>₹{INRPrice}</Text>;
    }
  };

  async componentDidMount() {
    await this.getRequests();
    await this.getExchangeRates();
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
    }, 2000);
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
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ReceiverDetails", {
                  ITEM: item,
                  INRPrice: this.generatePrice(item.currencyCode, item.price),
                })
              }
            >
              <ListItem
                containerStyle={{ backgroundColor: "#f8d0d0" }}
                titleStyle={{ color: "#534859", fontWeight: "bold" }}
                title={"Name: " + item.Name}
                subtitle={`Requested: ${item.RequestedService} \nIn Return: ${item.ReturnService}`}
                rightElement={() =>
                  this.generatePrice(item.currencyCode, item.price)
                }
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
