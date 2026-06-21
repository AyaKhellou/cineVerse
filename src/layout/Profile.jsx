import { useEffect, useState } from 'react'
import { auth } from '../firebase-config'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";



export default function Profile(){
    const navigate = useNavigate();
    const { user,userData } = useAuth();

    
    async function logout(){
        try{
            await signOut(auth)
            await console.log('logging out...')
            await navigate('/login')
        }
        catch(error){
            console.log(error.code)
            console.log(error.message)
        }
    }
    return(
        <div>
            <h1>{userData?.name}</h1>
            <p>This is the profile page.</p>
			<button type='button' onClick={logout}>Log out</button>
        </div>
    )
}