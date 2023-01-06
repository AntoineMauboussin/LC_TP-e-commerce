import { useContext, useState } from "react"
import { registerUser } from "../api/user"
import { EcommerceContext } from "../contexte/ecommerce";
import { useNavigate } from "react-router-dom";

export function Inscription() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const { setToken, setAdmin, setUserId } = useContext(EcommerceContext);
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        if (pass !== confirm) {
            alert("Les mots de passes sont différents")
        }
        else {
            registerUser(email, pass).then(data => {

                setToken(data.token)
                setAdmin(data.admin)
                setUserId(data.id)
                navigate('/')
            })
        }
    }
    return (
        <form className="loginForm" onSubmit={submitForm}>
            <label htmlFor="email">Saisissez votre email :</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="pass">Saisissez votre mot de passe :</label>
            <input type="password" id="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
            <label htmlFor="confirm">Confirmez votre mot de passe :</label>
            <input type="password" id="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <input type="submit" value="Inscription" />
        </form>
    )
}