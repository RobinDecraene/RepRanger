import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export function P({ children }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../../assets/fonts/FuturaCyrillicBook.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={{ fontFamily: 'FuturaCyrillicBook' }}>
      {children}
    </Text>
  );
}
