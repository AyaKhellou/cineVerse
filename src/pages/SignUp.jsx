import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config'



export default function SignUp(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();
    const [err,setErr] = useState(null);


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
                name,
                email,
                favorites: []
            })
            
            navigate('/profile')
            
        }
        catch(error){
            console.log(error.code)
            setErr(error.message)
            setEmail('')
            setPassword('')
            setName('')
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-visual">
                    <h1>Join MovieApp</h1>
                </div>
                <div className="auth-content">
                    <header className="auth-header">
                        <h2>Create your account</h2>
                        <p>Sign up to save favorites and personalize recommendations</p>
                    </header>
                    <form className="auth-form" onSubmit={(e)=>{e.preventDefault(); signUp();}}>
                        <label className="auth-label">
                            <span>Name</span>
                            <input 
                                className="auth-input"
                                type="text" 
                                placeholder="Your name"
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label className="auth-label">
                            <span>Email</span>
                            <input 
                                className="auth-input"
                                type="email" 
                                placeholder="you@example.com"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label className="auth-label">
                            <span>Password</span>
                            <input 
                                className="auth-input"
                                type="password" 
                                placeholder="Create a password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        {err&&
                        <p className='error-message'>{err}</p>
                        }
                        <div className="auth-actions">
                            <button className="auth-button primary" type='submit'>Sign Up</button>
                            <Link to="/login" className="auth-button ghost">Already have an account?</Link>
                        </div>
                    </form>
                    <p className="auth-help">Password must be at least 6 characters.</p>
                </div>
            </div>
        </main>
    )
}