import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { connectUser } from "../api/user"
import { EcommerceContext } from "../contexte/ecommerce";

export function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [message, setMessage] = useState("")
    const { setToken, setAdmin, setUserId } = useContext(EcommerceContext);
    const navigate = useNavigate()
    const submitForm = (e) => {
        e.preventDefault()
        connectUser(email, pass).then(data => {

            if(data.valid){
                setToken(data.token)
                setAdmin(data.niveau)
                setUserId(data.id)
                navigate('/')
            }
            else{
                setMessage(data.mess)
            }
        })
    }
    return (
        <form className="loginForm" onSubmit={submitForm}>
            <label htmlFor="email">Saisissez votre email :</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="pass">Saisissez votre mot de passe :</label>
            <input type="password" id="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
            <input type="submit" value="Connexion" />
            <p className="message">{message}</p>
        </form>
    )
}