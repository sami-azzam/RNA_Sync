import React, { useEffect } from 'react';
import {
    Button,
    SafeAreaView,
  } from 'react-native';
  
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './../../src/scenes/Login';
import Profile from './../../src/scenes/Profile';

import create from 'zustand';
import { userProfile } from '../models/types';


function Test(){
    interface appState {
        user: any;
        userData: any;
        initializing: boolean;
        test: string;
        setUser: (user : any) => void;
        setUserData: (userData : any) => void;
        setInitializing: (initializing : boolean) => void;
    }
    const useStore = create<appState>((set) => ({
        user: undefined,
        userData: undefined,
        initializing: true,
        test: 'Hello World',
        setUser: (user: any) => set((state) => ({ ...state, user: user })),
        setUserData: (userData: any) => set((state) => ({ ...state, userData: userData })),
        setInitializing: (initializing: boolean) => set((state) => ({ ...state, initializing: initializing }))
    }));
    const user = useStore((state) => state.user);
    const userData = useStore((state) => state.userData);
    const initializing = useStore((state) => state.initializing);
    const setUser = useStore((state) => state.setUser);
    const setUserData = useStore((state) => state.setUserData);
    const setInitializing = useStore((state) => state.setInitializing);
    
  
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


}


