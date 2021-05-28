import React, { Component } from "react";
import { Button, Card, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator, View } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default class user_find_mgz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _loader: false,
      showData: false,
      visibleCard: false,
      userEmail: null,

      getid: null,
      getEmail: null,
      getDisplayName: null,
      getkey: null,
    };
  }

  _findUSer = () => {
    if (this.state.userEmail != null) {
      this.setState({ _loader: true, visibleCard: false });

      axios
        .post(`https://gizi-apps.herokuapp.com/find-email`, {
          usergetEmail: this.state.userEmail,
        })
        .then((res) => {
          this.setState({
            _loader: false,
            showData: true,
            getid: res.data.uid,
            getEmail: res.data.email,
            getDisplayName: res.data.displayName,
          });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Please Insert Email");
    }
  };

  _getDetailUser = () => {
    this.setState({ _loader: true, showData: false });
    axios
      .post(`https://gizi-apps.herokuapp.com/get-db`, {
        useruid: this.state.getid,
      })
      .then((res) => {
        this.setState({
          getkey: res.data.data,
          _loader: false,
          visibleCard: true,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  _changeMobileKey = () => {
    axios
      .post(`https://gizi-apps.herokuapp.com/change-key`, {
        useruid: this.state.getid,
        serialKey: this.state.getkey,
      })
      .then((res) => {
        alert(`${res.data.data}`);
      })
      .catch((err) => {
        alert(err);
      });
  };
  _userForgotPass = () => {
    axios
      .post(`https://gizi-apps.herokuapp.com/reset`, {
        usergetEmail: this.state.getEmail,
      })
      .then((res) => {
        alert(`Reset Password has been Send ${res.data.data}`);
      })
      .catch((err) => {
        alert(err);
      });
  };
  _userVerified = () => {
    axios
      .post(`https://gizi-apps.herokuapp.com/verified`, {
        usergetEmail: this.state.getEmail,
      })
      .then((res) => {
        alert(`Verification Email has been Send ${res.data.data}`);
      })
      .catch((err) => {
        alert(err);
      });
  };
  _userDelete = () => {
    axios
      .post("https://gizi-apps.herokuapp.com/remove-users", {
        useruid: this.state.getid,
      })
      .then((res) => {
        alert(`Reset Password has been Send ${res.data.data}`);
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        <Button
          title="Scan QR-Code"
          icon={
            <AntDesign
              style={{ marginHorizontal: 5 }}
              name="scan1"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{
            width: wp("45%"),
            marginVertical: hp("2%"),
            backgroundColor: "#90EF90",
          }}
          onPress={() => this.props.navigation.navigate("scan-mgz")}
        />

        <Input
          placeholder="Find User with Email Address"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="email-check"
              size={24}
              color="#90EF90"
            />
          }
          keyboardType={"email-address"}
          onChangeText={(value) => this.setState({ userEmail: value })}
          value={this.state.userEmail}
        />

        <Button
          title="Find User"
          icon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="account-search"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{
            marginVertical: hp("2%"),
            width: wp("45%"),
            backgroundColor: "#90EF90",
          }}
          onPress={() => this._findUSer()}
        />

        {this.state._loader != true ? null : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              animating={this.state._loader}
              size="large"
              color="#0000ff"
            />
          </View>
        )}

        {this.state.showData != true ? null : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Found 1: {this.state.getDisplayName}</Text>

            <Button
              title="Show Detail"
              icon={
                <MaterialCommunityIcons
                  style={{ marginHorizontal: 5 }}
                  name="card-account-details"
                  size={24}
                  color="white"
                />
              }
              type="solid"
              buttonStyle={{
                marginVertical: hp("2%"),
                width: wp("45%"),
                backgroundColor: "#90EF90",
              }}
              onPress={() => this._getDetailUser()}
            />
          </View>
        )}

        {this.state.visibleCard != false ? (
          <ScrollView style={{ flex: 1 }}>
            <Card containerStyle={{ width: wp("80%") }}>
              <Card.Title>{this.state.getDisplayName}</Card.Title>
              <Card.Divider />

              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Input
                  placeholder="Email"
                  leftIcon={
                    <MaterialCommunityIcons
                      style={{ marginHorizontal: 5 }}
                      name="email"
                      size={24}
                      color="#90EF90"
                    />
                  }
                  disabled={true}
                  keyboardType={"default"}
                  returnKeyType={"done"}
                  value={this.state.getEmail}
                />

                <Input
                  placeholder="Mobile Serial Key"
                  leftIcon={
                    <MaterialCommunityIcons
                      style={{ marginHorizontal: 5 }}
                      name="key"
                      size={24}
                      color="#90EF90"
                    />
                  }
                  keyboardType={"default"}
                  returnKeyType={"done"}
                  onChangeText={(value) => this.setState({ getkey: value })}
                  value={this.state.getkey}
                />

                <Button
                  title="Change"
                  icon={
                    <MaterialCommunityIcons
                      style={{ marginHorizontal: 5 }}
                      name="account-edit"
                      size={24}
                      color="white"
                    />
                  }
                  type="solid"
                  buttonStyle={{
                    marginVertical: hp("1%"),
                    width: wp("45%"),
                    backgroundColor: "#90EF90",
                  }}
                  onPress={() => this._changeMobileKey()}
                />

                <Button
                  title="Forgot Password"
                  icon={
                    <MaterialCommunityIcons
                      style={{ marginHorizontal: 5 }}
                      name="onepassword"
                      size={24}
                      color="white"
                    />
                  }
                  type="solid"
                  buttonStyle={{
                    marginVertical: hp("1%"),
                    width: wp("45%"),
                    backgroundColor: "#90EF90",
                  }}
                  onPress={() => this._userForgotPass()}
                />

                <Button
                  title="Send Verified"
                  icon={
                    <MaterialCommunityIcons
                      style={{ marginHorizontal: 5 }}
                      name="email-send"
                      size={24}
                      color="white"
                    />
                  }
                  type="solid"
                  buttonStyle={{
                    marginVertical: hp("1%"),
                    width: wp("45%"),
                    backgroundColor: "#90EF90",
                  }}
                  onPress={() => this._userVerified()}
                />

                <Button
                  title="Delete Account"
                  icon={
                    <MaterialCommunityIcons
                      style={{ marginHorizontal: 5 }}
                      name="delete"
                      size={24}
                      color="white"
                    />
                  }
                  type="solid"
                  buttonStyle={{
                    marginVertical: hp("1%"),
                    width: wp("45%"),
                    backgroundColor: "#ff9b9b",
                  }}
                  onPress={() => this._userDelete()}
                />
              </View>
            </Card>
          </ScrollView>
        ) : null}
      </SafeAreaView>
    );
  }
}
