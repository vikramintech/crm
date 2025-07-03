import {useState,createContext,useContext,useEffect} from 'react';

const ActivityContext= createContext();

export const ActivityProvider=({children})=>{
    const [activityLog,setActivityLog]=useState([]);
    const logActivity=(message)=>{

        const timestamp= new Date().toLocaleString();

    setActivityLog(prev=>[{message,timestamp},...prev.slice(0,9)]);
    }
    return(
    <ActivityContext.Provider value={{activityLog,logActivity}}>{children}</ActivityContext.Provider>

    )
}
export const useActivity=()=>useContext(ActivityContext);