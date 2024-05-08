import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export function Card({ children, onPress, style }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.card, style]}>
        {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EBECF2',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  }
});
