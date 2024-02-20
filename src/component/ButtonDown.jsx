import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ButtonDown = ({}) =>{
  const navigation = useNavigation();


  return(
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <AntDesign name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Save')}>
        <MaterialCommunityIcons name="content-save-all" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20
  },
  button: { // Add this button style
    alignItems: 'center' // Align icon vertically in TouchableOpacity
  }
});

export default ButtonDown;

