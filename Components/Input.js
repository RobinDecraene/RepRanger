import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      underlineColor="transparent"
      keyboardType={keyboardType}
      />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:'#EBECF2',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginBottom: 10,
    width: 300,
  }
});