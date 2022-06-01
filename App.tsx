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
import Login from './src/scenes/Login';
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

// Handle user state changes
function onAuthStateChanged(user: any) {
  setUser(user);
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
      <View>
        <Text>Hello {user.displayName},</Text>
        <Text>{JSON.stringify(user)}</Text>
        <Button title="Logout" onPress={() => auth().signOut()} />
      </View>
    </SafeAreaView>


    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};





export default App;
