import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';

const EditAccount = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <MaterialCommunityIcons name="arrow-left" color='#4E598C' size={30} />
        </Pressable>

        <Title style={styles.title}>Bewerk profiel</Title>

        <Input
          placeholder="Profiel foto"
        />

        <Input
          placeholder="Voornaam" 
        />

        <Input
          placeholder="Achternaam" 
        />

        <Input
          placeholder="Email" 
          keyboardType="email-address"
          autoCapitalize='none'
        />

        <Input
          placeholder="Wachtwoord" 
          secureTextEntry={true}
        />

      <Button>Opslaan</Button>
      </View>
    </ScrollView>
  );
}

export default EditAccount

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
  title: {
    marginTop: 25,
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    top: 55,
    left: 20
  },
});
