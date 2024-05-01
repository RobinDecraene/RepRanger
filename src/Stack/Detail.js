import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Detail = () => {
  return (
    <View style={styles.container}>
      <Text>Detail</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
