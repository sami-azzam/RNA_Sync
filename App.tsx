import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './src/scenes/Login';
import Profile from './src/scenes/Profile';

import useStore from './src/models/store';

/* eslint-disable react-hooks/exhaustive-deps */

export default function App() {
  const user = useStore(state => state.user);
  const userData = useStore(state => state.userData);
  const initializing = useStore(state => state.initializing);
  const setUser = useStore(state => state.setUser);
  const setUserData = useStore(state => state.setUserData);
  const setInitializing = useStore(state => state.setInitializing);

  const [reRender, setRerender] = useState(false);

  // Handle user state changes
  async function onAuthStateChanged(passedUser: any) {
    setUser(passedUser);
    if (passedUser) {
      const doc = await firestore()
        .doc('users/' + passedUser.uid)
        .get();
      if (doc.exists) {
        setUserData(doc.data());
      }
    } else {
      userData !== undefined ? setUserData(undefined) : null; // Reset userData on logout
      user !== undefined ? setUser(undefined) : null; // Reset user on logout
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  /*
   * This runs on the first render.
   * If there is a logged in session from before,
   * it loads it back.
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [reRender]);

  function logout() {
    auth().signOut();
    setRerender(p => !p);
  }
  //Wait for Firebase to initialize
  if (initializing) {
    return <></>;
  }

  //Log in
  if (!user) {
    return (
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    );
  }

  //Show profile
  return (
    <SafeAreaView>
      <Profile user={user} userData={userData} />
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
