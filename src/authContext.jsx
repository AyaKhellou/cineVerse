import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection , getDoc, doc } from "firebase/firestore"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        async function getuserdata(){
            if(!user){
                setUserData(null)
                return;
            }
            const myData = await getDoc(doc(db, "users",user.uid));
            
            if(myData.exists()){
                setUserData(myData.data());
            }
        }
        getuserdata()
    },[user])

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}