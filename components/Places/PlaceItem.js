import React from 'react';
import { Image, Pressable, StyleSheet, View, Text } from 'react-native';

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect.bind(this, place.id )} style={({pressed}) => [styles.container, pressed && styles.pressed]}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
  pressed: {
    opacity: 0.7,
  },
});
