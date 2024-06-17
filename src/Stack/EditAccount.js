import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';
import * as ImagePicker from 'expo-image-picker';

import { Pressable, StyleSheet, View, Image, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../Components/Title';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import { P } from '../../Components/Text';

const EditAccount = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const userSnapshot = await firebase.firestore().collection('users').doc(currentUser.uid).get();
        const userData = userSnapshot.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Toegang tot camerarol",
          "We hebben toegang nodig tot uw camerarol voor dit te laten werken!",
        );
      }
    };

    requestPermission();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image Picker Result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } 
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    
    try {
      const response = await fetch(image);
      const blob = await response.blob();
    
      const ref = firebase.storage().ref().child(`profile_pictures/${firebase.auth().currentUser.uid}`);
      const uploadTask = ref.put(blob);
    
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            console.log(`Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
          },
          (error) => {
            console.error('Error uploading image:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await ref.getDownloadURL();
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };
  
  
  const handleSave = async () => {
    setLoading(true);
    const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);

    const updatedData = {
      firstName,
      lastName,
      email,
    };

    try {
      if (password) {
        const user = firebase.auth().currentUser;
        await user.updatePassword(password);
      }

      if (image) {
        const imageURL = await uploadImage();
        if (imageURL) {
          updatedData.profilePicture = imageURL;
        } else {
          console.error('Image upload failed, no URL obtained');
        }
      }

      await userRef.update(updatedData);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E598C" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.base}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#4E598C" />
        </Pressable>

        <Title>Bewerk profiel</Title>

        <Pressable onPress={pickImage}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.profileImage} />
              <P style={styles.float}>Bewerk</P>
            </>

          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="add-a-photo" size={40} color="#4E598C" />
            </View>
          )}
        </Pressable>

        <Input
          placeholder={firstName}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Input
          placeholder={lastName}
          value={lastName}
          onChangeText={setLastName}
        />

        <Input
          placeholder={email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize='none'
        />

        <Input
          placeholder="Wachtwoord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Button onPress={handleSave}>Opslaan</Button>
      </View>
    </ScrollView>
  );
};

export default EditAccount;

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
  icon: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  float: {
    position: 'absolute',
    top: 65,
    left: 45,
    color: '#000'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
