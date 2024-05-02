import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-paper';

export function Input({ placeholder, onPress, secureTextEntry }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
  });
  
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onPress}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      underlineColor="transparent"
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