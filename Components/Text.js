import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export function P({ children, style }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
    'FuturaCyrillicBold': require('../assets/fonts/FuturaCyrillicBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[{ fontFamily: 'FuturaCyrillicBook', fontSize: 20 }, style]}>
      {children}
    </Text>
  );
}
