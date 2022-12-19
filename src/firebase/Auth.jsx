// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


const firebaseConfig = {
    apiKey: "AIzaSyCFfQjKGNd11BoTWoG0mw46XHpVOkQnOTg",
    authDomain: "dev3-e-commerce.firebaseapp.com",
    projectId: "dev3-e-commerce",
    storageBucket: "dev3-e-commerce.appspot.com",
    messagingSenderId: "323139193012",
    appId: "1:323139193012:web:412eb95d83870cf0ddefe1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [user, setUser] = useState();

    const signUp = (email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        updateProfile(user, { displayName });
        setUser(user);
        return user;
    });
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        setUser(user);
        return user;


    });
    const signOutUser = () => signOut(auth).then(() => setUser(null));
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null)
        });
        return () => unsubscribe();

    })
    return {
        signIn, signUp, signOut: signOutUser, user
    }
}
export default AuthProvider;