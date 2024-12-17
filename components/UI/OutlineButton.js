import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

function OutlineButton({ onPress, children, icon }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={Colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  buttonText: {
    color: Colors.primary500,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 5,
  },
});
