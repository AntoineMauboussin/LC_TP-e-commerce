import { useContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { postProduct, getProducts } from "../api/product"
import { EcommerceContext } from "../contexte/ecommerce";
import { Product } from '../components/product'

export function Catalogue() {
    const [refresh, setRefresh] = useState(true)
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState("")
    const { token,setToken, setAdmin } = useContext(EcommerceContext);
    const navigate = useNavigate()

    useEffect(() => {
        getProducts().then(data => {

            setProducts(data)
        }).catch((error) => {
            console.error('Error:', error);
        });
    },[refresh]);

    const submitForm = (e) => {
        e.preventDefault()
        console.log(token)
        postProduct(token,e.target.image.value,e.target.nom.value,e.target.description.value,e.target.prix.value).then(() => {
            setRefresh(!refresh)
        })
    }
    return (
        <div className="mt">
            <h1 className="catalogue-title">Catalogue</h1>
            <div className="catalogue">

                {products.map((el) => {
                    return (<Product key={el.id} id={el.id} image={el.photo} nom={el.nom} prix={el.prix} description={el.description} />)
                })}
            </div>
        </div>
    )
}