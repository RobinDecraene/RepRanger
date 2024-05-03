import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';


const NiewWorkout = () => {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>

      </View>
    </ScrollView>
  );
}

export default NiewWorkout

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});