import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {useFonts} from 'expo-font'
import { useEffect } from 'react';
import Subscribe from './pages/Subscribe';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Complain from './pages/Complain';


export default function App() {
  const Stack = createStackNavigator()
  let fontsLoaded = useFonts({
    "Outfit": require('./assets/fonts/Outfit-Regular.ttf'),
    "Outfit-Bold" : require('./assets/fonts/Outfit-Bold.ttf'),
    "Poppins": require('./assets/fonts/Poppins-Regular.ttf')
  })
  
  if(!fontsLoaded) return

  return (
    <>
  
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name = "Subscribe" component={Subscribe}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
        <Stack.Screen name = "Complain" component={Complain}></Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
    {/* <Navbar></Navbar> */}
    </>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
