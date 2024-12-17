import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import OutlineButton from "../UI/OutlineButton";
import { Place } from "../../model/place";
import { useIsFocused, useRoute } from "@react-navigation/native";

function PlaceForm({oncreatePlace}) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    if (isFocused && route.params?.pickedLocation) {
      // Check if the user picked a location
      setLocation(route.params.pickedLocation);
    }
  }, [isFocused, route.params]);


  const onchangeTitle = (text) => {
    setTitle(text);
  };
  const onImageChange = (image) => {
    setImage(image);
  }
  const onlocationChange = useCallback((location) => {
    setLocation(location);
  } , []);

  const savePlaceHandler = () => {
    const place = new Place(title, image, location);
    oncreatePlace(place);
    
  }
  return ( 
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={onchangeTitle} style={styles.input} value={title} />
        <ImagePicker onImagePicked= {onImageChange} />
        <LocationPicker onlocationPicked ={onlocationChange} />
        <OutlineButton icon="save" onPress={savePlaceHandler} >Save Place</OutlineButton>
      </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBotom: 5,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomColor: Colors.primary700,
    fontSize: 16,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
