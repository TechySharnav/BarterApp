import { createStackNavigator } from "react-navigation-stack";
import offerScreen from "../screen/offerScreen";
import receiverDetailsScreen from "../screen/ReceiverDetailsScreen";

const StackNavigator = createStackNavigator(
  {
    OfferService: {
      screen: offerScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiverDetails: {
      screen: receiverDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "OfferService",
  }
);

export default StackNavigator;
