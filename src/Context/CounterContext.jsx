import { createContext, useState } from "react";



export let CounterContext=createContext(0)

export default function CounterContextProvider(props){

    let [counter,setCounter]=useState(10)
    let [userName,setUserName]=useState("Route")

    return <CounterContext.Provider value={{counter,setCounter}}>
{props.children}
    </CounterContext.Provider>
}