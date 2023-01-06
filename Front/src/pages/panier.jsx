import { useContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { postPanier } from "../api/panier"
import { EcommerceContext } from "../contexte/ecommerce";
import { Product } from '../components/product'
import { useParams } from "react-router-dom";

export function Panier() {
    let total = 0;
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState("")
    const { token,panier, userId,setPanier} = useContext(EcommerceContext);
    const navigate = useNavigate()
    let { id } = useParams();

    const validatePanier = (e) => {
        if(panier.length == 0){
            setMessage("Panier vide")
            return
        }
        postPanier(token,panier, userId).then(data => {
            setMessage(data.mess)
            setPanier([])
        })
    }

    return (
        <div className="mt">
            <h1>Panier</h1>
            <div className="panier">

                {panier.map((el) => {
                    total += el[3]*el[1]
                    return (<div key={el[0]}>
                        <p>{el[2]} x{el[1]}</p>
                        <p>{(el[3]*el[1]).toFixed(2)}€</p>
                    </div>)
                })}
                <p>Total: {total.toFixed(2)}€</p>
                <button onClick={validatePanier}>Valider mon panier</button>
                <p className="message">{message}</p>
            </div>
        </div>
    )
}