import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useOutletContext } from "react-router-dom"

export default function Authrequired(){
    const { user, loadingData, loadingAuth } = useAuth()

    if(loadingData || loadingAuth) return null;

    if(!user){
        return <Navigate to='signup' replace/>
    } 
    if(user){
        return <Outlet />
    }
}