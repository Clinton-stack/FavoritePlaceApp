import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PlaceItem from './PlaceItem';
import { getPlaceById } from '../../util/database';
import { useNavigation } from '@react-navigation/native';

function PlacesList({ places }) {
  const navigation = useNavigation();
  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', { placeId: id });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }


  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
      
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 18,
    color: 'white',
  },
});
