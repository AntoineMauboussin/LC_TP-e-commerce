import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EcommerceContext } from "../contexte/ecommerce";

export function Logout() {
    const { setToken, setAdmin } = useContext(EcommerceContext);
    const navigate = useNavigate()

    useEffect(() => {
        setToken("")
        setAdmin(false)
        navigate('/')
    }, []);
    return (
        <h1 className="mt">LogOut Works !</h1>
    )
}