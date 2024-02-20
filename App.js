import React from "react";
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Button from "./src/component/ButtonDown"; 
import SearchWeather from "./src/component/SearchWeather";
import CurrentWeather from "./src/component/CurrentWeather";
import SaveWeather from "./src/component/SaveWeather";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () =>{
  return(
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={CurrentWeather} />
      <Stack.Screen name="Search" component={SearchWeather} />
      <Stack.Screen name="Save" component={SaveWeather} />

      </Stack.Navigator>        
      <Button />
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default App