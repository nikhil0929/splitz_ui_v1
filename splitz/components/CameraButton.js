import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons"

import colors from "../config/colors";

export default function CameraButton({title, onPress, icon, color}) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name ={icon} size={28} color={color ? color: colors.white}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    button: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.primary,
        marginLeft: 10,
    }

})