import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";
import TitleText from "../components/TitleText";
import ButtonText from "../components/ButtonText";
import Profile from "../components/Profile";
import UserTotals from "../components/UserTotals";
import ButtonText2 from "../components/ButtonText2";
import HeadingText from "../components/HeadingText";

import Bill from "../components/Bill";
import ManageViewScreen2 from "./UserGroupsListScreen";
import { AxiosContext } from "../axiosCaller";

const ManageViewScreen1 = () => {
  console.log("UserBillsListScreen");
  const navigation = useNavigation();
  const [isScreen1, setIsScreen1] = useState(true); // New state to toggle between ManageViewScreen1 and ManageViewScreen2

  const handleChangeScreen = () => {
    setIsScreen1(!isScreen1);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          style={styles.logo}
          source={require("../assets/splitzofficiallogo.png")}
        ></Image>
      </SafeAreaView>
      <View style={styles.containerBox}>
        {isScreen1 ? (
          <ManageViewScreen2 handleChangeScreen={handleChangeScreen} />
        ) : (
          <BillsView handleChangeScreen={handleChangeScreen} />
        )}
      </View>
    </View>
  );
};
const BillsView = ({ handleChangeScreen }) => {
  const navigation = useNavigation();
  const axiosCaller = useContext(AxiosContext);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    axiosCaller
      .get("/receipts/receipts-list")
      .then((response) => {
        setBills(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const totalBills = bills.length;
  const recentBills = bills; // MODIFY THESE LINES
  const allBills = bills; // MODIFY THESE LINES
  return (
    <View>
      <Text
        style={{
          marginBottom: 5,
          color: "black",
          fontSize: 26,
          alignSelf: "center",
          fontWeight: "bold",
        }}
      >
        Bill Manager
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity style={styles.clickBox}>
          <Text style={styles.mainText}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherBox} onPress={handleChangeScreen}>
          <Text style={styles.otherText}>Groups</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <LinearGradient
          colors={["#C58AF3", "#EE8BC6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.detailBox}
        >
          <View>
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 45,
              }}
            >
              {totalBills}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.detailBox2}>
          <Text
            style={{
              alignSelf: "center",
              color: "black",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Bills
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 25 }}>
        <TitleText>Your Bills</TitleText>
        <View style={{ flexdirection: "row" }}>
          <FlatList
            data={bills}
            keyExtractor={(item) => {
              return item.id;
            }}
            scrollEnabled={true}
            horizontal={true}
            renderItem={({ item }) => {
              return <Bill currentBill={item} />;
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 25 }}>
        <TitleText>All Bills</TitleText>
        <View style={{ flexdirection: "row" }}>
          <FlatList
            data={bills}
            keyExtractor={(item) => {
              return item.id;
            }}
            scrollEnabled={true}
            horizontal={true}
            renderItem={({ item }) => {
              return <Bill currentBill={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  logo: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
    width: "40%",
    height: 50,
    alignSelf: "flex-start",
  },
  containerBox: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 30,
  },
  editButton: {
    height: 30,
    width: 30,
  },
  clickBox: {
    width: 80,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginBottom: 10,
    color: colors.white,
    fontWeight: "bold",
  },
  otherBox: {
    width: 130,
    height: 40,
    backgroundColor: "transparent",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginBottom: 10,
  },
  mainText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
  otherText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
  },
  detailBox: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    width: 140,
    justifyContent: "center",
    alignContent: "center",
  },
  detailBox2: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 40,
    width: 140,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default ManageViewScreen1;
