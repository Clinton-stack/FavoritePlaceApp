import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces() {
  const isFocused = useIsFocused()
  const [loadedplaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function getPlaces() {
      // fetch places from database
      const places = await  fetchPlaces()
      setLoadedPlaces(places);
    }
    if (isFocused) {
      getPlaces();
    }
  }, [isFocused]);  

  return (
    <View style={styles.container}>
      <PlacesList places={loadedplaces} />
    </View>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
