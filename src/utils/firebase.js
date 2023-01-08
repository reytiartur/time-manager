import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRGxwEpr_ZWH34O6G52y0JDFuNuhdsF8s",
  authDomain: "time-manager-saas.firebaseapp.com",
  projectId: "time-manager-saas",
  storageBucket: "time-manager-saas.appspot.com",
  messagingSenderId: "74532090306",
  appId: "1:74532090306:web:2619dc603a800956f3e65b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUserWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user 
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert('Email already in use.')
        } else {
            console.log('User creation error', error.message); 
        }
    }
}

export const logInWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user;
    } catch(error) {
        console.log('Log in error!', error.message)
    }
}

export const logOut = async () => {
    await signOut(auth)
}

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("We sent you an email. Check your inbox!")
    } catch (err) {
        if(err.code === 'auth/missing-email') {
            alert("Provide us with your email first.")
        }
    }
}