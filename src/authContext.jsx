import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection , getDoc, doc } from "firebase/firestore"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(()=>{
        async function getuserdata(){
            if(!user){
                setUserData(null)
                return;
            }
            setLoadingData(true)

            const myData = await getDoc(doc(db, "users",user.uid));
            
            if(myData.exists()){
                setUserData(myData.data());
            }
            
            setLoadingData(false)
        }
        getuserdata()
    },[user])

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoadingAuth(false)
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, setUserData, loadingData, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}