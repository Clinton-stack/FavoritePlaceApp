import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlaces({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Removes the default back button
    });
  }, [navigation]);
  const oncreatePlaceHandler = async (place) => {
   await insertPlace(place);
    navigation.navigate("AllPlaces");
    navig
  }
  return (
    <View style={{ flex: 1 }}>
      <PlaceForm oncreatePlace={oncreatePlaceHandler}/>
    </View>
  );
}

export default AddPlaces;
