import { createContext,useContext, useEffect,useState} from "react";
import {me} from "../api/auth";

type User={
    id:string;
    name:string;
    email:string;
}

type AuthContextType={
    user:User | null;
    setUser:(u:User|null)=>void;
    loading:boolean;
}

const AuthContext = createContext<AuthContextType|null>(null);

export function AuthProvider({children}:{children:React.ReactNode}){
    const [user,setUser] = useState<User|null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        me()
            .then(res=>setUser(res.data.user))
            .catch(()=>setUser(null))
            .finally(()=>setLoading(false))
    },[]);

    return (
        <AuthContext.Provider value={{user,loading,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}