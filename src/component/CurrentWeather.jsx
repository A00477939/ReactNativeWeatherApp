import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Location from "expo-location";





const CurrentWeather = ({ navigation }) => { 
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    feels: 0,
    max: 0,
    min: 0,
  });

  const fetchWeather = (latitude = 25, longitude = 25) => {
    fetch(
       //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=c70084a5e8a2058ce8a54ff0f61a4afe&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setWeatherData({
          temperature: json.main.temp,
          feels: json.main.feels_like,
          max: json.main.temp_max,
          min: json.main.temp_min,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      fetchWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);

      setLocation(currentLocation);
    };
      getPermissions();
  }, []); 

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>SMU Weather</Text>
        <View style={styles.weatherInfo}>
          <Text style={styles.temp}>{weatherData.temperature}°C</Text>
          <Text style={styles.feel}>Feels like {weatherData.feels}°C</Text>
          <View style={styles.maxMinWrapper}>
            <Text style={styles.maxmin}>max {weatherData.max}°C</Text>
            <Text style={[styles.maxmin, { marginLeft: 10 }]}>min {weatherData.min}°C</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    color: 'black',
    fontSize: 48,
    marginBottom: 20,
    textAlign: 'center'
  },
  weatherInfo: {
    alignItems: 'center'
  },
  temp: {
    color: 'black',
    fontSize: 38,
    // eslint-disable-next-line no-dupe-keys
    color: 'red'
  },
  feel: {
    color: 'red',
    fontSize: 28,
    paddingBottom: 20
  },
  maxmin: {
    color: 'red',
    fontSize: 18
  },
  maxMinWrapper: {
    flexDirection: 'row',
    marginBottom: 20
  }
});

export default CurrentWeather;
