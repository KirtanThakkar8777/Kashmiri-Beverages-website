import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Checkauth({children}){

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuth = async () =>{
            const res = await fetch("http://localhost:5000/Message",{
                method:"GET",
                credentials: "include"
            });
            if(res.status === 401){
                navigate("/login")
            }
        };
        checkAuth();
    },[navigate])

    return(
        children
    )
}
export default Checkauth;