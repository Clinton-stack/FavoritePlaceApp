import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/UI/OutlineButton";
import { Colors } from "../constants/colors";
import { getPlaceById } from "../util/database";

function PlaceDetails({route, navigation}) {
    const [place, setPlace] = useState();
    const selectedPlaceId = route.params.placeId
    
    const showOnMapHandler = () => {
        navigation.navigate("Map", {
          readOnly: true,  // Correct syntax
          initialLocation: {
            lat: place.lat,
            lng: place.lng
          }
        });
      };
      
  useEffect(() => {
    // fetch the place details
    const getPlace = async () => {
        const place = await getPlaceById(selectedPlaceId);
        setPlace(place);
        navigation.setOptions({ title: place.title });
    }
    getPlace();
  }, [selectedPlaceId]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: place.imageUri}}/>
      <View style={styles.locationConatiner}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationConatiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
