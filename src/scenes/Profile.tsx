import React, { useState } from "react";
import {Button,  ScrollView, StyleProp, Text, TextInput, TextStyle} from "react-native";
import firestore from "@react-native-firebase/firestore";
import {userProfile} from "../models/types";
import Section from "../components/Section";


export default function Profile({user, userData}: any){
    //This deleted unnecesary keys from the user._user object.
    ["isAnonymous", "emailVerified", "metadata", "providerData", "providerId", "refreshToken", "tenantId"].forEach(key=>{
        delete user._user[key];
    });

   const userDataTemplate: userProfile = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    emirate: "",
    plateNo: "",
    carType: "",
    carColor: ""
    };
    // Merge with template to make sure all keys are set
   const userInfo = (userData === undefined) ? 
        {...userDataTemplate, ...user._user } : 
        {...userDataTemplate, ...user._user, ...userData};

    
    const [userProfile, setUserProfile] = useState<userProfile>(userInfo);
    
    const [isComplete, setComplete] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    // Change the title if incomplete profile
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
            const $user = firestore().doc('users/' + user.uid);
            await $user.set(userProfile);
            setComplete(true);
            error === true ? setError(false): null;
        }
        catch(error){
            console.log(error);
            setError(true);
        }
    }

    return(
        <ScrollView>
        <Text style={$title}>{incomplete()} Your Profile</Text>

        <Section title="Personal Details">
            <TextInput style={$textInput} placeholder="Name" value={userProfile.displayName} onChangeText={(text)=>setUserProfile((prev: any)=>({...prev, displayName: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Email" value={userProfile.email} onChangeText={ (text)=>setUserProfile( (prev: any)=>({...prev, email: text})) }></TextInput>
            <TextInput style={$textInput} value={userProfile.phoneNumber} editable={false}></TextInput>
        </Section>
        <Section title="Car Details">
            <TextInput style={$textInput} placeholder="Emirate" value={userProfile.emirate} onChangeText={(text)=>setUserProfile((prev) => ({...prev, emirate: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Plate No" value={userProfile.plateNo} onChangeText={(text)=>setUserProfile((prev) => ({...prev, plateNo: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Car Type" value={userProfile.carType} onChangeText={(text)=>setUserProfile((prev) => ({...prev, carType: text}))}></TextInput>
            <TextInput style={$textInput} placeholder="Car Color" value={userProfile.carColor} onChangeText={(text)=>setUserProfile((prev) => ({...prev, carColor: text}))}></TextInput>
        </Section>
        <Button title="Save" onPress={submit}></Button>
        {isComplete && <Text style={$complete}>Profile Saved</Text>}
        {error && <Text style={$error}>Please chack your internet connection and try again.</Text>}
        </ScrollView>
    );
    
}

// Styles
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

const $complete : StyleProp<TextStyle> = {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
}

const $error : StyleProp<TextStyle> = {
    ...$complete,
    color: "red",
}