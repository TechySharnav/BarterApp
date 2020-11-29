import React, { Component } from "react";
import { KeyboardAvoidingView, Animated } from "react-native";
import LottieView from "lottie-react-native";

export default class SecurityAnimation extends Component {
  constructor() {
    super();

    this.state = { isFinished: false, progress: 0 };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isFinished: false,
        progress: this.state.progress + 1 / 120,
      });
      if (this.state.progress > 1) {
        this.setState({ progress: 1600 / 6000 + 0.04 });
      }
    }, 1 / 6);
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <LottieView
          source={require("../assets/loginAnimation.json")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 250,
            position: "absolute",
            left: "-18%",
            top: 5,
            paddingBottom: 20,
          }}
          autoPlay={false}
          loop={false}
          onAnimationFinish={() => {
            this.setState({ isFinished: true });
          }}
          progress={this.state.progress}
        ></LottieView>
      </KeyboardAvoidingView>
    );
  }
}
