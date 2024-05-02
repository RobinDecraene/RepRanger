import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Link } from '@react-navigation/native';

export function Button({ children, onPress }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
  });
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={{ fontFamily: 'FuturaCyrillicBook', color: "#fff", fontSize: 20 }}>{ children }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#FCAF58',
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
  }
});