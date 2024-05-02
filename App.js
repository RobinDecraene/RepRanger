import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from './Firebase';

import Start from './src/Auth/Start';
import Login from './src/Auth/Login';
import Registration from './src/Auth/Registration';

import Home from './src/BottomTab/Home';
import Workout from './src/BottomTab/Workout';
import Tips from './src/BottomTab/Tips';
import Account from './src/BottomTab/Account';
import Detail from './src/Stack/Detail';
import { Title } from './Components/Title';
import { useEffect, useState } from 'react';

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
        headerTitle: props => <Title {...props} />,
      }}
    >
    <Stack.Screen
      name='Start'
      component={Start}
      options={{ headerShown: false }}
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
      initialRouteName="Home"
      activeColor="#FCAF58"
      inactiveColor="#fff"
      barStyle={{ backgroundColor: '#4E598C', height: 100 }}
      theme={{colors: {secondaryContainer: 'transparent'}}}
      labeled={false}
    >
      <Tab.Screen
        name='1'
        component={StackNavigatorHome}
        options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
          }}
      />
      <Tab.Screen
        name='2'
        component={StackNavigatorWorkout}
        options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="run" color={color} size={30} />
            ),
          }}
      />
      <Tab.Screen
        name='3'
        component={StackNavigatorTips}
        options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="lightbulb" color={color} size={30} />
            ),
          }}
      />
      <Tab.Screen
        name='4'
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

function StackNavigatorHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: props => <Title {...props} />,
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
      />
      <Stack.Screen
        name='Detail'
        component={Detail}
      />
    </Stack.Navigator>
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
      <Stack.Screen name='Tips' component={Tips}/>
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
      <Stack.Screen name='Account' component={Account}/>
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
