import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Overlay, Button, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Axios from "axios";

export default function scan_mkp() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  //get text from json
  const [displayName, setdisplayName] = useState(null);
  const [campus, setcampus] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [mobileKey, setmobileKey] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const userRegister = () => {
    setLoader(true);
    Axios.post("https://materi-keperawatan-apps.herokuapp.com/API-Create", {
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      displayName: displayName,
      displayCampus: campus,
      serialKey: mobileKey,
    })
      .then((res) => {
        setLoader(false);
        alert(res.data.message);
      })
      .catch((err) => {
        setLoader(false);
        alert(err.message);
      });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const json = `${data}`;
      const obj = JSON.parse(json);
      setdisplayName(obj.displayName);
      setcampus(obj.displayCampus);
      setphoneNumber(obj.phone);
      setemail(obj.email);
      setpassword(obj.password);
      setmobileKey(obj.mobileKey);
      setVisible(true);
    } catch (e) {
      alert(`not barcode from alter code: ${e}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}

      <Overlay
        overlayStyle={{ width: wp("75%"), alignItems: "center" }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Input
          placeholder="Name"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="card-account-details"
              size={24}
              color="#496595"
            />
          }
          onChangeText={(text) => setdisplayName(text)}
          value={displayName}
          keyboardType={"default"}
          returnKeyType={"done"}
        />

        <Input
          placeholder="Campus"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="school"
              size={24}
              color="#496595"
            />
          }
          keyboardType={"default"}
          returnKeyType={"done"}
          onChangeText={(text) => setcampus(text)}
          value={campus}
        />

        <Input
          placeholder="Phone Number"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="cellphone"
              size={24}
              color="#496595"
            />
          }
          keyboardType={"name-phone-pad"}
          returnKeyType={"done"}
          onChangeText={(text) => setphoneNumber(text)}
          value={phoneNumber}
        />

        <Input
          placeholder="Email"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="email-check"
              size={24}
              color="#496595"
            />
          }
          keyboardType={"email-address"}
          returnKeyType={"done"}
          onChangeText={(text) => setemail(text)}
          value={email}
        />

        <Input
          placeholder="Password"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="form-textbox-password"
              size={24}
              color="#496595"
            />
          }
          keyboardType={"default"}
          returnKeyType={"done"}
          onChangeText={(text) => setpassword(text)}
          value={password}
        />

        <Input
          placeholder="Mobile Serial Key"
          leftIcon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="key"
              size={24}
              color="#496595"
            />
          }
          keyboardType={"default"}
          returnKeyType={"done"}
          onChangeText={(text) => setmobileKey(text)}
          value={mobileKey}
        />

        <Button
          title="Register User"
          icon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="account-multiple-plus"
              size={24}
              color="white"
            />
          }
          disabled={loader != false ? true : false}
          type="solid"
          buttonStyle={{
            marginVertical: hp("2%"),
            width: wp("45%"),
            backgroundColor: "#496595",
          }}
          onPress={() => userRegister()}
        />

        <ActivityIndicator
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          animating={loader}
          size="small"
          color="#0000ff"
        />

        <Button
          title="Close"
          icon={
            <MaterialCommunityIcons
              style={{ marginHorizontal: 5 }}
              name="close"
              size={24}
              color="white"
            />
          }
          type="solid"
          buttonStyle={{
            marginVertical: hp("2%"),
            width: wp("45%"),
            backgroundColor: "#496595",
          }}
          onPress={() => toggleOverlay()}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
