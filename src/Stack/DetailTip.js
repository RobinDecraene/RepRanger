import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DetailTip = () => {
  return (
    <View style={styles.container}>
      <Text>DetailTip</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default DetailTip

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
