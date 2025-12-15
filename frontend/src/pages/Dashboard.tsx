import { useAuth } from "../context/AuthContent";
export default function Dashboard(){
    const {user} = useAuth();
    return <h1> Welcome , {user?.name}</h1>
}