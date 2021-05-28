import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import {
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//React Navigation
import { StackActions } from "@react-navigation/native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="Materi Keperawatan"
          icon={
            <Fontisto
              style={{ marginHorizontal: 5 }}
              name="nursing-home"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{ width: wp("60%"), marginVertical: hp("2%") }}
          onPress={() => this.props.navigation.navigate("user-find-mkp")}
        />

        <Button
          title="Ukom Keperawatan"
          icon={
            <Fontisto
              style={{ marginHorizontal: 5 }}
              name="blood-test"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{ width: wp("60%"), marginVertical: hp("2%") }}
        />

        <Button
          title="Ukom Kebidanan"
          icon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="account-child"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{ width: wp("60%"), marginVertical: hp("2%") }}
        />

        <Button
          title="Farmasi"
          icon={
            <Fontisto
              style={{ marginHorizontal: 5 }}
              name="drug-pack"
              size={24}
              color="white"
            />
          }
          onPress={() => this.props.navigation.navigate("user-find-mfm")}
          type="solid"
          buttonStyle={{
            width: wp("60%"),
            marginVertical: hp("2%"),
            backgroundColor: "#4662BC",
          }}
        />

        <Button
          title="Kedokteran"
          icon={
            <Fontisto
              style={{ marginHorizontal: 5 }}
              name="doctor"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{ width: wp("60%"), marginVertical: hp("2%") }}
        />

        <Button
          title="Kedokteran Gigi"
          icon={
            <FontAwesome5
              style={{ marginHorizontal: 5 }}
              name="teeth-open"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{ width: wp("60%"), marginVertical: hp("2%") }}
        />
        <Button
          title="Gizi"
          icon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="food-variant"
              size={24}
              color="white"
            />
          }
          onPress={() => this.props.navigation.navigate("user-find-mgz")}
          type="solid"
          buttonStyle={{
            width: wp("60%"),
            marginVertical: hp("2%"),
            backgroundColor: "#90EF90",
          }}
        />
      </SafeAreaView>
    );
  }
}
