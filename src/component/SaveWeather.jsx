import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';

const db = SQLite.openDatabase("myDb.db");

const SaveWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  const WeatherDelete = (id)=>{
    console.log(id);
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM weather WHERE id = ?;`, [id]);

    })

    
}


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM weather',
        [],
        (_, { rows }) => {
          const data = rows._array;
          setWeatherData(data);
        }
      );
    });
  }, [weatherData]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Weather Data</Text>
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}: {item.temp}°C</Text>
            <TouchableOpacity onPress={()=>WeatherDelete(item.id)}>
            <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SaveWeather;
