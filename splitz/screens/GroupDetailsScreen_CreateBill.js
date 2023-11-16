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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../config/colors";
import TitleText from "../components/TitleText";
import ButtonText from "../components/ButtonText";
import Profile from "../components/Profile";
import UserTotals from "../components/UserTotals";
import ButtonText2 from "../components/ButtonText2";
import HeadingText from "../components/HeadingText";
import BottomTabNavigator from "../navigators/BottomTabNavigator";
import CustomBottomTabBar from "../navigators/CustomBottomTabBar";

import Bill from "../components/Bill";
import GoBackButton from "../components/GoBackButton";
import { AxiosContext } from "../axiosCaller";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const GroupDetailsScreen_CreateBill = ({ route }) => {
  const { room } = route.params;
  const [viewMode, setViewMode] = useState("Bills"); // default to 'Bills'
  const navigation = useNavigation();
  const groupNameInputRef = useRef(null);
  const axiosCaller = useContext(AxiosContext);

  const [receiptsData, setReceiptsData] = useState(null);
  console.log("Room is: ", room);

  useEffect(() => {
    axiosCaller
      .get("/receipts/" + room.room_code)
      .then((response) => {
        console.log(response.data);
        setReceiptsData(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [room]);

  // const recentBills = receiptsData.filter((bill) => bill.createdDays <= 7);
  // const allBills = receiptsData.filter((bill) => bill.createdDays > 7);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          style={styles.logo}
          source={require("../assets/splitzofficiallogo.png")}
        ></Image>
      </SafeAreaView>
      <View style={styles.containerBox}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          }}
        >
          <GoBackButton />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.primary,
            }}
          >
            Group ID: {room.room_code}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <TextInput
            ref={groupNameInputRef}
            placeholder="Group Name"
            style={styles.billNameInput}
          ></TextInput>
          <TouchableOpacity onPress={() => groupNameInputRef.current.focus()}>
            <Image
              style={styles.editButton}
              source={require("../assets/editButton.png")}
            ></Image>
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity
            style={styles.otherBox}
            onPress={() =>
              navigation.navigate("GroupDashboard", { baseURL: baseURL })
            }
          >
            <Text style={styles.otherText}>Dashboard</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateBill", { baseURL: baseURL })
            }
          >
            <View
              style={{
                alignSelf: "center",
                backgroundColor: colors.secondary,
                width: 270,
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  marginTop: 0,
                  fontWeight: "bold",
                  color: colors.white,
                  alignSelf: "center",
                }}
              >
                +
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: colors.white,
                  alignSelf: "center",
                }}
              >
                Create New Bill
              </Text>
            </View>
          </TouchableOpacity>
          <ScrollView
            style={{
              marginTop: 25,
              paddingLeft: 25,
            }}
          >
            <View>
              <TitleText>Recent Bills</TitleText>
              <View style={{ flexdirection: "row" }}>
                <FlatList
                  data={receiptsData}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  scrollEnabled={true}
                  horizontal={true}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity>
                        <Bill
                          billName={item.receipt_name}
                          createdBy={item.owner_id}
                          createdDays={0}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 25 }}>
              <TitleText>All Bills</TitleText>
              <View style={{ flexdirection: "row" }}>
                <FlatList
                  data={receiptsData}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  scrollEnabled={true}
                  horizontal={true}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity>
                        <Bill
                          billName={item.receipt_name}
                          createdBy={item.owner_id}
                          createdDays={0}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    width: screenWidth,
    height: screenHeight,
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
  },
  editButton: {
    height: 30,
    width: 30,
  },
  billNameInput: {
    fontSize: 25,
    marginRight: 15,
    fontWeight: "bold",
  },
  itemBox2: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  clickBox: {
    width: 80,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginBottom: 25,
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
    marginBottom: 25,
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
});

export default GroupDetailsScreen_CreateBill;
