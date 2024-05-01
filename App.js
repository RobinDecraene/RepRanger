import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/BottomTab/Home';
import Workout from './src/BottomTab/Workout';
import Tips from './src/BottomTab/Tips';
import Account from './src/BottomTab/Account';
import Detail from './src/Stack/Detail';

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#FCAF58"
    inactiveColor="#fff"
    barStyle={{ backgroundColor: '#4E598C' }}
    >
      <Tab.Screen name='Home' component={StackNavigatorHome}/>
      <Tab.Screen name='Workout' component={StackNavigatorWorkout}/>
      <Tab.Screen name='Tips' component={StackNavigatorTips}/>
      <Tab.Screen name='Account' component={StackNavigatorAccount}/>
    </Tab.Navigator>
  )
}

function StackNavigatorHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='Detail' component={Detail}/>
    </Stack.Navigator>
  )
}

function StackNavigatorWorkout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Workout' component={Workout}/>
    </Stack.Navigator>
  )
}


function StackNavigatorTips() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Tips' component={Tips}/>
    </Stack.Navigator>
  )
}


function StackNavigatorAccount() {
  return (
    <Stack.Navigator>
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
