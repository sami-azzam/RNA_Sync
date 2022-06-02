import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);

  const [phone, setPhone] = useState<string>("+971");
  const [code, setCode] = useState('');

  const [error, setError] = useState(false);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber : string) {
    // Test if Phone number is valid here, if it's invalid, use SetError to show error message.
    // if(!valid) setError(true);
    // return;
    const confirmation : any = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      setError(false);
    } catch (error) {
      setError(true)
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
    <View>
    <TextInput style={$textInput} value={phone} onChangeText={text => setPhone(text)} />
    <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber(phone)}
      />
    
    { error && <Text style={$error} >The Phone number or code is invalid.</Text>}
    
    </View>
      
    );
  }

  return (
    <>
      <TextInput style={$textInput} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

const $textInput = {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }

const $error = {
    color: 'red',
    padding: 10,
}