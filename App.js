import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useCallback, useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import PlaceDetails from "./screens/PlaceDetails";


const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false)
 
  useEffect(() => {
    async function prepareApp() {
      try {
        // Keep the splash screen visible while initializing
        await SplashScreen.preventAutoHideAsync();
       
        // Initialize database
        await init();
        setDbInitialized(true);
      } catch (err) {
        console.log("Error initializing the database:", err);
      }
    }

    prepareApp();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      // Hide the splash screen once initialization is done
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null; // Prevent rendering anything until initialization is complete
  }


  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <NavigationContainer >
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "All Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  iconName="add"
                  color={tintColor}
                  size={23}
                  onPress={() => {
                    navigation.navigate("AddPlaces");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlaces"
            component={AddPlaces}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: 'Map',
            }} />
             <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
