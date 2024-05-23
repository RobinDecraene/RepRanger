import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';

export function Title({ children, style }) {
  const [fontsLoaded] = useFonts({
    'BauhausRegular': require('../assets/fonts/BAUHS93.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
}


const styles = StyleSheet.create({
  title: {
    fontFamily: 'BauhausRegular',
    color: '#4E598C',
    fontSize: 35,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 25
  }
});