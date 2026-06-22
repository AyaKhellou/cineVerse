import { auth } from '../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";



export default function LogIn(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const[err, setErr] = useState(null);


    async function login(){
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/profile')
        }
        catch(error){
            console.log(error.code)
            setErr(error.message)
            setEmail('')
            setPassword('')
        }
    }




    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-visual">
                    <h1>MovieApp</h1>
                </div>
                <div className="auth-content">
                    <header className="auth-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to continue to your account</p>
                    </header>
                    <form className="auth-form" onSubmit={(e)=>{e.preventDefault(); login();}}>
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
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        {err&&
                        <p className='error-message'>{err}</p>
                        }
                        <div className="auth-actions">
                            <button className="auth-button primary" type='submit'>Log in</button>
                            <Link to="/signup" className="auth-button ghost">Create account</Link>
                        </div>
                    </form>
                    <p className="auth-help">By continuing you agree to our terms and privacy policy.</p>
                </div>
            </div>
        </main>
    )
}

