import { auth } from '../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";



export default function LogIn(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();


    async function login(){
        try{
            await signInWithEmailAndPassword(auth, email, password)
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
				<button type='button' onClick={login}>Log in</button>
			</form>
		</main>
	)
}

