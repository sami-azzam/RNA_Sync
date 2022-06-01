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
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
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
function onAuthStateChanged(user: any) {
  setUser(user);
  if(user){
    firestore().collection('users').doc(user.uid).get().then(function(doc) {
      if (doc.exists) {
        setUserData(doc.data());
      }
    });
  }
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);
  
  
  if(initializing) return(<></>);
  const userD = firestore().collection('users').doc(user?.uid).get();
  

  if(!user) return( <SafeAreaView><Login /></SafeAreaView>);
  
    return (
      <SafeAreaView>
        {/* <View>
          <Text>Hello {user.displayName},</Text>
          <Text>{JSON.stringify(user)}</Text>
          <Text>{typeof user}</Text>
          <Button title="Logout" onPress={() => auth().signOut()} />
        </View> */}
        <Profile user={user}></Profile>
      </SafeAreaView>
    );
  
};





export default App;
