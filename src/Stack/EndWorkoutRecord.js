import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const EndWorkoutRecord = () => {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
      <Image
          style={styles.ranger}
          source={require('../../assets/images/ranger.png')}
        />
      </View>
    </ScrollView>
  );
}

export default EndWorkoutRecord

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  ranger: {
    width: 200,
    height: 400,
    resizeMode: 'contain'
  },
});
