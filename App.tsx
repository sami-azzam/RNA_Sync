import React, { useEffect, useState } from 'react';

import {
  Button,
  SafeAreaView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './src/scenes/Login';
import Profile from './src/scenes/Profile';


export default function App() {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  //Default user
  const [user, setUser] = useState<any>(null);
  //Firestore user data
  const [userData, setUserData] = useState<any>(undefined);

  
  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    setUser(user);
    if(user){
      const doc = await firestore().doc('users/' + user.uid).get();
      if (doc.exists) {
        setUserData(doc.data());
      } 
    }
    if (initializing) setInitializing(false);
  }

  /* 
  * This runs on the first render. 
  * If there is a logged in session from before, 
  * it loads it back.
  */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
    
  //Wait for Firebase to initialize
  if(initializing) return(<></>);

  //Log in
  if(!user) return( <SafeAreaView><Login /></SafeAreaView>);

  //Show profile
  return (
    <SafeAreaView>
      <Profile user={user} userData={userData}></Profile>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </SafeAreaView>
  );
    
};



