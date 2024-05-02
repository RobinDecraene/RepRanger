import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export function SmallText({ children }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
  });

  return (
    <Text style={{ fontFamily: 'FuturaCyrillicBook', color: '#9CA2BF', fontSize: 12 }}>
      {children}
    </Text>
  );
}
