import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  
    const initialLocation = route.params && {
        lat: route.params.initialLocation.lat,
        lng: route.params.initialLocation.lng
    }
    console.log(initialLocation)

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = (event) => {
        if (initialLocation) {
            return;
        }
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat, lng });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
            Alert.alert("No Location Picked", "Please pick a location before saving", [{ text: "Okay" }]);
            return;
        }
        navigation.navigate("AddPlaces", { pickedLocation: {lat: selectedLocation.lat, lng: selectedLocation.lng } });
    }, [selectedLocation, navigation]);

    useLayoutEffect(() => {
        if (initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton iconName="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
            ),
        });
    }, [navigation, savePickedLocationHandler, initialLocation]);

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={region}
                style={styles.map}
                onPress={selectLocationHandler}
            >
                {selectedLocation &&  (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng,
                        }}
                        title="Picked Location"
                    />
                ) }
            </MapView>
        </View>
    );
}


export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
