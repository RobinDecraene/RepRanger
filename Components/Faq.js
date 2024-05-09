import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { P } from './Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function FAQ({ children, onPress, style }) {
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.faq, style]} onPress={handlePress}>
      <P style={{ fontSize: 20 }}>{ children }</P>
      <MaterialCommunityIcons name="arrow-right" color='#9CA2BF' size={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  faq: {
    backgroundColor:'#EBECF2',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    marginTop: 10
  }
});