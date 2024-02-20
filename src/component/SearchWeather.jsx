import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from "expo-sqlite";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';



function getDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("myDb.db");
  return db;
}

const db = getDatabase();



const SearchWeather = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clearWeatherData, setClearWeatherData] = useState(false);
  const [location, setLocation] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    feels: 0,
    max: 0,
    min: 0,
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


useEffect(() => {
  if (clearWeatherData) {
    setWeatherData({});
    setClearWeatherData(false); 
    setSearchQuery("");
  }
}, [clearWeatherData]);
  
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS weather (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "name TEXT, " +
        "temp REAL" +
        ");",
        (message) => console.log(message)
      );
    });
  }, []);
  




  //Add
  const insertWeatherData = (name, temp) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) AS count FROM weather;",
        [],
        (_, { rows }) => {
          const count = rows._array[0].count;
          console.log("Number of rows in 'weather' table:", count);
  
          if (count <= 3) {
            tx.executeSql(
              "INSERT INTO weather (name, temp) VALUES (?, ?)",
              [name, temp],
              (_, results) => {
                console.log("Weather data inserted successfully.");
                setClearWeatherData(true);
              }
            );
          } else {
            toggleModal();
          }
        }
      );
    });
  };
  




  const searchWeather = (place = 'Surat') => {
    fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=c70084a5e8a2058ce8a54ff0f61a4afe&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        setWeatherData({
          temperature: json.main.temp,
          feels: json.main.feels_like,
          max: json.main.temp_max,
          min: json.main.temp_min,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const setLocation = searchQuery;
    searchWeather(setLocation);
    //createWeatherTable();

  };


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} >
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.weatherInfo}>
          <Text style={styles.temp}>{weatherData.temperature}°C</Text>
          <Text style={styles.feel}>Feels like {weatherData.feels}°C</Text>
          <View style={styles.maxMinWrapper}>
            <Text style={styles.maxmin}>Max {weatherData.max}°C</Text>
            <Text style={[styles.maxmin, { marginLeft: 10 }]}>Min {weatherData.min}°C</Text>
          </View>
        </View>
        <TouchableOpacity onPressIn={() => insertWeatherData(searchQuery, weatherData.temperature)}>
        <MaterialCommunityIcons name="content-save-all" size={24} color="black" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} contentContainerStyle={{ height: 200 }}>
      <View style={{ height: 200 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Text>Storage is full</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
};

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
  weatherInfo: {
    alignItems: 'center'
  },
  temp: {
    color: 'black',
    fontSize: 38,
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
  },
  search: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  }
});

export default SearchWeather;
