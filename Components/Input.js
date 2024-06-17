import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-paper';

export function Input({ placeholder, onChangeText, autoCapitalize, secureTextEntry, keyboardType }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
  });
  
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      keyboardType={keyboardType}
      mode="outlined"
      outlineColor="transparent"
      theme={{
        roundness: 30,
        colors: {
          primary: '#8990B2',
          placeholder: '#757DA5'
        },
      }}
      />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EBECF2',
    borderRadius: 30,
    marginBottom: 15,
    width: '100%',
    color: '#4E598C',
    padding: 5,
    textAlign: 'center'
  }
});