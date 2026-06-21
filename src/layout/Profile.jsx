import { auth, db } from '../firebase-config'
import { signOut } from 'firebase/auth'
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useState, useEffect } from 'react';


function getInitials(name = ''){
    return name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
}

export default function Profile(){
    const navigate = useNavigate();
    const { user, userData, setUserData } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [bio, setBio] = useState(userData?.bio || 'add bio.');
    const [name, setName] = useState(userData?.name || user.email);
    

    async function logout(){
        try{
            await signOut(auth)
            navigate('/login')
        }
        catch(error){
            console.log(error.code)
            console.log(error.message)
        }
    }

    async function updateProfileInfo(){
        setEditMode(false)
        await updateDoc(doc(db,"users", user.uid), {
            bio: bio,
            name:name});
        setUserData(prev => ({
        ...prev,
        bio,
        name}))
    }


    if(editMode){
        return(
            <main className="profile-page">
            <section className="profile-card">
                <div className="profile-avatar">
                    <div className="avatar-fallback">{getInitials(name || user?.email || 'U')}</div>
                </div>
                <div className="profile-info">
                    <input 
                    className='profile-name' 
                    type="text" name="name" 
                    value={name} onChange={(e)=>setName(e.target.value)} />

                    <p className="profile-email">{user?.email}</p>
                    <input 
                    className='profile-bio' 
                    type="text" name="bio" 
                    value={bio} onChange={(e)=>setBio(e.target.value)} />
                    <div className="profile-actions">
                        <button className="btn btn-primary" type="button" 
                        onClick={updateProfileInfo}>Save changes</button>
                    </div>
                </div>
            </section>
        </main>
        )
    }

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-avatar">
                    <div className="avatar-fallback">{getInitials(name || user?.email || 'U')}</div>
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{name}</h1>
                    <p className="profile-email">{user?.email}</p>
                    <p className="profile-bio">
                        {bio}
                    </p>
                    <div className="profile-actions">
                        <button className="btn btn-primary" type="button" onClick={logout}>Log out</button>
                        <button className="btn btn-ghost" type="button" onClick={() => navigate('/favorites')}>Favorites</button>
                        <button className="btn btn-ghost" type="button" onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                </div>
            </section>
        </main>
    )
}