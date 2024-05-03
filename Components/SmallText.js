import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export function SmallText({ children, style }) {
  const [fontsLoaded] = useFonts({
    'FuturaCyrillicBook': require('../assets/fonts/FuturaCyrillicBook.ttf'),
  });

  return (
    <Text style={[{ fontFamily: 'FuturaCyrillicBook', color: '#9CA2BF', fontSize: 16 }, style]}>
      {children}
    </Text>
  );
}
