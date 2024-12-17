import React, { act, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview, getAddressFromCoords } from "../../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";


function LocationPicker({ onlocationPicked }) {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

const mapPickedLocation = route.params && {
    lat: route.params.pickedLocation.lat,
    lng: route.params.pickedLocation.lng,
}
useEffect(() => {
    if(isFocused && route.params) {
        const mapPickedLocation = route.params && {
            lat: route.params.pickedLocation.lat,
            lng: route.params.pickedLocation.lng,
        }
        setPickedLocation(mapPickedLocation);

    }
   
}   , [route, isFocused]);

  useEffect(() => {
    async function locateUser() {
      if (pickedLocation) {
       const address = await getAddressFromCoords(pickedLocation.lat, pickedLocation.lng);
        onlocationPicked({...pickedLocation, address: address});
      }
    }
    locateUser();
  }, [pickedLocation, onlocationPicked]);

  const verifyPermissions = async () => {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const resposne = await requestPermission();
      return resposne.granted;
    }
    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You need to grant camera permission to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  const locationPickedHandler = () => {
    navigation.navigate("Map");
  };
  return (
    <View>
      <View style={styles.mapPreview}>
        <Image
          source={{
            uri:
              pickedLocation?.lat && pickedLocation?.lng
                ? getMapPreview(
                    pickedLocation.lat,
                    pickedLocation.lng
                  )
                : "https://via.placeholder.com/600x300", // Placeholder image
          }}
          style={styles.mapImage}
        />
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={locateUserHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={locationPickedHandler}>
          Pick Location
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
