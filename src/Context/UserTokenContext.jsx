import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";




export let UesrTokenContext=createContext(null)

export default function UesrTokenContextProvider({children}){
    let[token,setToken]=useState(null);
    let[userId,setUserId]=useState(null);
    function convertToken(){
        let data=jwtDecode(localStorage.getItem("token"))
        setUserId(data.id)
    }
    useEffect(()=>{

        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            convertToken()
            
        }
    })


    return <UesrTokenContext.Provider value={{token,setToken,setUserId,convertToken , userId}}>
        {children}

    </UesrTokenContext.Provider>
}
