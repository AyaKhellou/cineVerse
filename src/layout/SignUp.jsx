import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { use, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { doc,collection, addDoc, setDoc} from "firebase/firestore";
import { db } from '../firebase-config'



export default function SignUp(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();


    async function signUp(){
        try{
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCredential.user, {
                displayName: name
            });
            
            await setDoc(doc(db,"users",userCredential.user.uid),{
                favorites: []
            })
            
            navigate('/profile')
            
        }
        catch(error){
            console.log(error.code)
            console.log(error.message)
        }
    }

	return (
		<main className="login-page">
			<form className="login-form">
                <label>
					Name
					<input 
                    type="text" 
                    placeholder="name..."
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    />
				</label>

				<label>
					Email
					<input 
                    type="email" 
                    placeholder="Email..."
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    />
				</label>

				<label>
					Password
					<input 
                    type="password" 
                    placeholder="Password..." 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
				</label>

				<button type='button' onClick={signUp}>Sign Up</button>
			</form>
		</main>
	)
}