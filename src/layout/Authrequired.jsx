import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useOutletContext } from "react-router-dom"




export default function Authrequired(){
    const { user } = useAuth()
    const { genres, API_KEY } = useOutletContext()



    if(user){
        return <Outlet context={{genres, API_KEY}}/>
    }
    if(!user){
        return <Navigate to='signup'/>
    } 
}