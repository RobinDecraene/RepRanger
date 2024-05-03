import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from './Firebase';
import { Title } from './Components/Title';
import { useEffect, useState } from 'react';

import Start from './src/Auth/Start';
import Login from './src/Auth/Login';
import Registration from './src/Auth/Registration';

import Workout from './src/BottomTab/Workout';
import Tips from './src/BottomTab/Tips';
import Account from './src/BottomTab/Account';

import DetailTip from './src/Stack/DetailTip';
import DetailExercise from './src/Stack/DetailExercise';
import DetailWorkout from './src/Stack/DetailWorkout';
import NiewWorkout from './src/Stack/NiewWorkout';

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
    <Stack.Navigator>
    <Stack.Screen
      name='Start'
      component={Start}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='Login'
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='Registration'
      component={Registration}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
  )
  }

  return (
    <Tab.Navigator
      initialRouteName="Workout"
      activeColor="#FCAF58"
      inactiveColor="#fff"
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
        headerTitle: props => <Title {...props} />,
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
        name='NiewWorkout'
        component={NiewWorkout}
      />
    </Stack.Navigator>
  )
}


function StackNavigatorTips() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: props => <Title {...props} />,
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
        headerTitle: props => <Title {...props} />,
      }}
    >
      <Stack.Screen
        name='Account'
        component={Account}
      />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
