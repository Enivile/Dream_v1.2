// // src/screens/LoginScreen.js
// import React, { useEffect } from 'react';
// import { Button, View, Text } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
// import { firebaseConfig } from '../firebase/firebaseConfig';
// import * as Crypto from 'expo-crypto'; // Import expo-crypto for random number generation

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // WebBrowser fix for authentication session
// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual client ID
//     scopes: ['profile', 'email'],
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.authentication;

//       // Use the id_token to create a Firebase credential
//       const credential = GoogleAuthProvider.credential(id_token);

//       // Sign in with Firebase using the Google credential
//       signInWithCredential(auth, credential)
//         .then((userCredential) => {
//           console.log('Signed in with Google:', userCredential.user);
//           // Handle successful login (e.g., navigate to main app screen)
//         })
//         .catch((error) => {
//           console.error('Error signing in with Google:', error);
//         });
//     }
//   }, [response]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button
//         title="Login with Google"
//         onPress={() => promptAsync()}
//         disabled={!request}
//       />
//     </View>
//   );
// }
