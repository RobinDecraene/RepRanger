import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export function SmallTitle({ children, style }) {
  const [fontsLoaded] = useFonts({
    'BauhausRegular': require('../assets/fonts/BAUHS93.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[{ fontFamily: 'BauhausRegular', color: '#4E598C', fontSize: 25 }, style]}>
      {children}
    </Text>
  );
}