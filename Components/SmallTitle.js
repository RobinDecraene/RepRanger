import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';

export function SmallTitle({ children, style }) {
  const [fontsLoaded] = useFonts({
    'BauhausRegular': require('../assets/fonts/BAUHS93.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[styles.smallTitle, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  smallTitle: {
    fontFamily: 'BauhausRegular',
    color: '#4E598C',
    fontSize: 26,
    marginBottom: 20
  },
});
