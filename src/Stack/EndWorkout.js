import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const EndWorkout = () => {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Text>EndWorkout</Text>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default EndWorkout

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
