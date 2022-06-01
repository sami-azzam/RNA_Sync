/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleProp,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './src/scenes/Login';
import Profile from './src/scenes/Profile';
//import Login from './src/scenes/Login';

function App() {
const $highlight: StyleProp<any> = {
  fontWeight: '700',
}
const $backgroundStyle: StyleProp<any> = {
  backgroundColor: useColorScheme() === 'dark' ? Colors.darker : Colors.lighter,
};
// Set an initializing state whilst Firebase connects
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState<any>(null);
const [userData, setUserData] = useState<any>(null);

// Handle user state changes
async function onAuthStateChanged(user: any) {
  setUser(user);
  if(user){
    const doc = await firestore().collection('users').doc(user.uid).get()
    if (doc.exists) {
      setUserData(doc.data());
    }
  }
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);
  
  
  if(initializing) return(<></>);
  

  if(!user) return( <SafeAreaView><Login /></SafeAreaView>);
  
    return (
      <SafeAreaView>
        <Profile user={user} userData={userData}></Profile>
        <Button title="Logout" onPress={() => auth().signOut()} />
      </SafeAreaView>
    );
  
};


export default App;
