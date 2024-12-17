import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ iconName, color, onPress, size }) {
  return (
    <Pressable style={ ({pressed})=>  [styles.button, pressed && styles.pressed ]} onPressIn={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    pressed :{
        opacity : 0.7,

    }
    });
