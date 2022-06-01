import React, { useState } from "react";
import {Button, ColorValue, ScrollView, StyleProp, Text, TextInput, TextStyle} from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {userProfile} from "../models/types";
import Section from "../components/Section";


export default function Profile({user, userData}: any){
    
   ["isAnonymous", "emailVerified", "metadata", "providerData", "providerId", "refreshToken", "tenantId"].forEach(key=>{
       delete user._user[key];
   })

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
    
   
    const [extraUserData, setUserData] = useState<userProfile>(userData);
    const [defaultUserData, setDefault] = useState(user._user);

    function incomplete(){
        if(userData === undefined){
            return 'Please Complete';
        }
        else {
            return '';
        };
    }
   

    async function submit(){
    try{
        const $user = firebase.firestore().doc('users/' + user.uid);
        await $user.set({
            ...defaultUserData,
            ...extraUserData
        });
    }
    catch(error){
        console.log("Hello there!! This is me!");
        console.log(JSON.stringify({...defaultUserData,
            ...extraUserData}));
        console.log(error);
    }
    }

    return(
        <ScrollView>
        <Text style={$title}>{incomplete()} Your Profile</Text>

        <Section title="Personal Details">
            <TextInput style={$textInput} placeholder="Name" value={defaultUserData.displayName} onChangeText={(text)=>setDefault((prev: any)=>({...prev, displayName: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Email" value={defaultUserData.email} onChangeText={ (text)=>setDefault( (prev: any)=>({...prev, email: text})) }></TextInput>
            <TextInput style={$textInput} value={user.phoneNumber} editable={false}></TextInput>
        </Section>
        <Section title="Car Details">
            <TextInput style={$textInput} placeholder="Emirate" value={extraUserData.emirate} onChangeText={(text)=>setUserData((prev) => ({...prev, emirate: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Plate No" value={extraUserData.plateNo} onChangeText={(text)=>setUserData((prev) => ({...prev, plateNo: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Car Type" value={extraUserData.carType} onChangeText={(text)=>setUserData((prev) => ({...prev, carType: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Car Color" value={extraUserData.carColor} onChangeText={(text)=>setUserData((prev) => ({...prev, carColor: text}))}></TextInput>
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