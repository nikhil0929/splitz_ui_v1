import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateGroupScreen from "../screens/CreateGroupScreen";
import GroupDetailsStack from "./GroupDetailsStack";
import colors from "../config/colors";

const GroupActionNavigator = createStackNavigator();

const GroupActionStack = () => {
  console.log("Group Action Stack");
  return (
    <GroupActionNavigator.Navigator
      screenOptions={{
        headerStyled: {
          backgroundColor: "transparent",
        },
        headerTitle: "",
        headerLeft: () => null,
        headerTintColor: colors.white,
        headerTransparent: true,
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
    >
      <GroupActionNavigator.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
      />

      <GroupActionNavigator.Screen
        name="GroupDetails"
        component={GroupDetailsStack}
      />
    </GroupActionNavigator.Navigator>
  );
};

export default GroupActionStack;
