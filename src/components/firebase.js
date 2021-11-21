import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDfmaROnwIcM9qCperOpqHDWq890zEO7Vk",
    authDomain: "friends-real-time-chat.firebaseapp.com",
    projectId: "friends-real-time-chat",
    storageBucket: "friends-real-time-chat.appspot.com",
    messagingSenderId: "841096857039",
    appId: "1:841096857039:web:31e31f0292053c80dc7eba"
}).auth();