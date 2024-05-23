import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Card } from '../../Components/Card';
import { P } from '../../Components/Text';

const DetailTip = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, description } = route.params;
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title style={styles.title}>{title}</Title>

        <Card style={styles.exerciseInfo}>
          <P>{description}</P>
          <Image
          style={styles.ranger}
            source={require('../../assets/images/ranger-head.png')}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

export default DetailTip

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FAFAFC',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 40
  },
  title: {
    width: '85%'
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
  ranger: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -50,
    left: -10
  },
  exerciseInfo: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'flex-start',
  }
});
