import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImageSelector from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

function ImagePicker({onImagePicked}) {
  const [cameraPermissionInformation, requestPermission] =
    ImageSelector.useCameraPermissions();
    const [pickedImage, setPickedImage] = useState()

  async function verifyPermissions() {
    if (
      cameraPermissionInformation.status ===
      ImageSelector.PermissionStatus.UNDETERMINED
    ) {
      const resposne = await requestPermission();
      return resposne.granted;
    }
    if (cameraPermissionInformation.status === ImageSelector.PermissionStatus.DENIED) {
        Alert.alert('Permission Denied', 'You need to grant camera permission to use this app', [{text: 'Okay'}])
        return false
    }
    return true
    
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImageSelector.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 12],
      quality: 0.5,
    });
    const imageUri = image.assets[0].uri
 
    setPickedImage(imageUri)
    onImagePicked(imageUri)
  }
  return (
    <View>
      <View style={styles.imageConatiner}>
       { pickedImage ? <Image source={{uri: pickedImage}} style={styles.image}  /> : <Text style={ styles.text}>No image picked yet</Text>} 
      </View>
      <OutlineButton icon='camera' onPress={takeImageHandler} > Take Image </OutlineButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        
    },
    imageConatiner: {
        width: "100%",
        height: 200,
        borderColor: "#ccc",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 4,
        overflow: "hidden",
    },
    text: {
        fontSize: 14,
        color: Colors.primary100,
    },

    });