import React, { useState } from "react";
import {Button,  ScrollView, StyleProp, Text, TextInput, TextStyle} from "react-native";
import { firebase } from "@react-native-firebase/auth";
import {userProfile} from "../models/types";
import Section from "../components/Section";


export default function Profile({user, userData}: any){

   ["isAnonymous", "emailVerified", "metadata", "providerData", "providerId", "refreshToken", "tenantId"].forEach(key=>{
       delete user._user[key];
   })
   const userInfo = userData !== undefined ? userData : user._user;

    const userDataTemplate: userProfile = {
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
        emirate: "",
        plateNo: "",
        carType: "",
        carColor: ""
    }
   
     if(userData === undefined){
        userData = userDataTemplate;
    } 
    
    const [userProfile, setUserProfile] = useState<userProfile>(userInfo);
    

    function incomplete(){
        if(userProfile === undefined){
            return 'Please Complete';
        }
        else {
            return '';
        };
    }
   

    async function submit(){
    try{
        const $user = firebase.firestore().doc('users/' + user.uid); //Why ?
        await $user.set(userProfile);
    }
    catch(error){
        console.log(error);
    }
    }

    return(
        <ScrollView>
        <Text style={$title}>{incomplete()} Your Profile</Text>

        <Section title="Personal Details">
            <TextInput style={$textInput} placeholder="Name" value={userProfile.displayName} onChangeText={(text)=>setUserProfile((prev: any)=>({...prev, displayName: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Email" value={userProfile.email} onChangeText={ (text)=>setUserProfile( (prev: any)=>({...prev, email: text})) }></TextInput>
            <TextInput style={$textInput} value={user.phoneNumber} editable={false}></TextInput>
        </Section>
        <Section title="Car Details">
            <TextInput style={$textInput} placeholder="Emirate" value={userProfile.emirate} onChangeText={(text)=>setUserProfile((prev) => ({...prev, emirate: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Plate No" value={userProfile.plateNo} onChangeText={(text)=>setUserProfile((prev) => ({...prev, plateNo: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Car Type" value={userProfile.carType} onChangeText={(text)=>setUserProfile((prev) => ({...prev, carType: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Car Color" value={userProfile.carColor} onChangeText={(text)=>setUserProfile((prev) => ({...prev, carColor: text}))}></TextInput>
        </Section>
        <Button title="Save" onPress={submit}></Button>
        </ScrollView>
    );
    
}

const $textInput: StyleProp<TextStyle> = {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }

  const $title : StyleProp<TextStyle> = {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
}