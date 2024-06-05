import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { P } from './Text';
import { MaterialIcons } from '@expo/vector-icons';

export function FAQ({ children, onPress, style }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.faq, style]} onPress={handlePress}>
      <P style={{ fontSize: 20, minWidth: '90%', maxWidth: '90%' }}>{ children }</P>
      <MaterialIcons name="keyboard-arrow-right" size={40} color="#4E598C" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  faq: {
    backgroundColor:'#EBECF2',
    
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    minWidth: '100%',
    maxWidth: '100%',
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 50,
    marginBottom: 15
  }
});