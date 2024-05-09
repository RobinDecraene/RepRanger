import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const DetailTip = () => {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Text>DetailTip</Text>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default DetailTip

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
});
