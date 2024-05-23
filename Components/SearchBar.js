import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-paper';

export function SearchBar({ placeholder, onChangeText }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
  });
  
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCorrect={false}
      style={styles.input}
      mode="outlined"
      outlineColor="#8990B2"
      theme={{
        roundness: 30,
        colors: {
          primary: '#4E598C',
          placeholder: '#757DA5',
        },
      }}
      />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginBottom: 15,
    width: '100%',
  }
});