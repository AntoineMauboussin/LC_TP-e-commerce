import { useContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api/product"
import { EcommerceContext } from "../contexte/ecommerce";
import { Product } from '../components/product'
import { useParams } from "react-router-dom";

export function Detail() {
    const [refresh, setRefresh] = useState(true)
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState("")
    const { token,setToken, setAdmin } = useContext(EcommerceContext);
    const navigate = useNavigate()
    let { id } = useParams();

    useEffect(() => {
        getSingleProduct(id).then(data => {
            setProducts([data])
        }).catch((error) => {
            console.error('Error:', error);
        });
    },[refresh]);

    return (
        <div className="mt">
            <h1>Détail du produit</h1>
            <div className="catalogue">

                {products.map((el) => {
                    return (<Product key={el.id} id={el.id} image={el.photo} nom={el.nom} prix={el.prix} description={el.description} />)
                })}
            </div>
        </div>
    )
}