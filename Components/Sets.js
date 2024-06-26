import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { P } from './Text';


export function Set({ children, onPress  }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.sets}>
      <P style={styles.setsText}>{children}</P>
    </Pressable>
  );
}

export function SetPressed({ children, onPress  }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.setsPressed}>
      <P style={styles.setsPressedText}>{children}</P>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sets: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#FCAF58',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'transparent'
  },
  setsText: {
    color: '#FCAF58'
  },
  setsPressed: {
    borderWidth: 1,
    borderColor: '#FCAF58',
    backgroundColor: '#FCAF58',
    borderRadius: 40,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  setsPressedText: {
    color: '#FAFAFC'
  }
});