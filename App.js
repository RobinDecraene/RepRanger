import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from './Firebase';
import { useEffect, useState } from 'react';
import registerNNPushToken from 'native-notify';

import Start from './src/Auth/Start';
import Login from './src/Auth/Login';
import Registration from './src/Auth/Registration';

import Workout from './src/BottomTab/Workout';
import Tips from './src/BottomTab/Tips';
import Account from './src/BottomTab/Account';

import DetailWorkout from './src/Stack/DetailWorkout';
import BaseDetailWorkout from './src/Stack/BaseDetailWorkout';
import NiewWorkout from './src/Stack/NiewWorkout';
import EditWorkout from './src/Stack/EditWorkout';
import StartWorkout from './src/Stack/StartWorkout';
import Exercises from './src/Stack/Exercises';
import DetailExercise from './src/Stack/DetailExercise';
import EndWorkoutRecord from './src/Stack/EndWorkoutRecord';

import DetailTip from './src/Stack/DetailTip';

import EditAccount from './src/Stack/EditAccount';
import DetailHistory from './src/Stack/DetailHistory';

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function TabNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

if (!user){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen
      name='Start'
      component={Start}
    />
    <Stack.Screen
      name='Login'
      component={Login}
    />
    <Stack.Screen
      name='Registration'
      component={Registration}
    />
  </Stack.Navigator>
  )
  }

  return (
    <Tab.Navigator
      initialRouteName="Workout"
      activeColor="#FCAF58"
      inactiveColor="#FAFAFC"
      barStyle={{ backgroundColor: '#4E598C', height: 100 }}
      theme={{colors: {secondaryContainer: 'transparent'}}}
      labeled={false}
    >
      <Tab.Screen
        name='1'
        component={StackNavigatorWorkout}
        options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="run" color={color} size={30} />
            ),
          }}
      />
      <Tab.Screen
        name='2'
        component={StackNavigatorTips}
        options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="lightbulb" color={color} size={30} />
            ),
          }}
      />
      <Tab.Screen
        name='3'
        component={StackNavigatorAccount}
        options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
      />
    </Tab.Navigator>
  )
}

function StackNavigatorWorkout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Workout'
        component={Workout}

      />
      <Stack.Screen
        name='DetailWorkout'
        component={DetailWorkout}
      />
      <Stack.Screen
        name='DetailExercise'
        component={DetailExercise}
      />
      <Stack.Screen
        name='BaseDetailWorkout'
        component={BaseDetailWorkout}
      />
      <Stack.Screen
        name='NiewWorkout'
        component={NiewWorkout}
      />
      <Stack.Screen
        name='EditWorkout'
        component={EditWorkout}
      />
      <Stack.Screen
        name='Exercises'
        component={Exercises}
      />
      <Stack.Screen
        name='StartWorkout'
        component={StartWorkout}
      />
      <Stack.Screen
        name='EndWorkoutRecord'
        component={EndWorkoutRecord}
      />
    </Stack.Navigator>
  )
}


function StackNavigatorTips() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen
        name='Tips'
        component={Tips}
      />
      <Stack.Screen
        name='DetailTip'
        component={DetailTip}
      />
    </Stack.Navigator>
  )
}


function StackNavigatorAccount() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen
        name='Account'
        component={Account}
      />
      <Stack.Screen
        name='EditAccount'
        component={EditAccount}
      />
      <Stack.Screen
        name='DetailHistory'
        component={DetailHistory}
      />
    </Stack.Navigator>
  )
}


export default function App() {
  registerNNPushToken(21812, 'b67eaYAE7QXOYD16dJLarM');
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
