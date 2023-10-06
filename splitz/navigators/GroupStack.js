import React from "react";

import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateGroupScreen from "../screens/CreateGroupScreen";
import JoinGroupScreen from "../screens/JoinGroupScreen";
import ReceiptScreen from "../screens/ReceiptScreen";
import ManualEntryScreen from "../screens/ManualEntryScreen";
import SplitScreen from "../screens/SplitScreen";
import BillTotalScreen from "../screens/BillTotalScreen";
import GroupViewStack from "./GroupViewStack";
import BottomTabNavigator from "./BottomTabNavigator";
import ManageStack from "./ManageStack";
import Profile from "../components/Profile";
import MainContent from "./MainContent";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import CreateJoinStack from "./CreateJoinStack";
import GroupViewScreen1 from "../screens/GroupViewScreen1";

const MainStack = createStackNavigator();

const GroupStack = () => (
<MainStack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Tabs" component={BottomTabNavigator} />
    <MainStack.Screen name="GroupView" component={GroupViewStack} />
    <MainStack.Screen name="BillTotal" component={BillTotalScreen} />
    <MainStack.Screen name="Receipt" component={ReceiptScreen} />
    <MainStack.Screen name="ManualEntry" component={ManualEntryScreen} />
    <MainStack.Screen name="Split" component={SplitScreen} />
</MainStack.Navigator>
);

export default GroupStack;