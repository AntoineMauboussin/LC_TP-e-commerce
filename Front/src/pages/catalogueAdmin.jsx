import { useContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { postProduct, getProducts } from "../api/product"
import { EcommerceContext } from "../contexte/ecommerce";
import { Product } from '../components/product'

export function CatalogueAdmin() {
    const [refresh, setRefresh] = useState(true)
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState("")
    const { token,setToken, setAdmin } = useContext(EcommerceContext);
    const navigate = useNavigate()

    useEffect(() => {
        getProducts().then(data => {

            if(!Array.isArray(data)){
                setProducts([data])

            }else{
                setProducts(data)
            }
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
        <div className="mt catalogue">
            <form className="product-form" onSubmit={submitForm}>
                <h2>Nouveau produit</h2>
                <label htmlFor="image">Url de l'image :</label>
                <input name="image" required />
                <label htmlFor="nom">Nom :</label>
                <input name="nom" required />
                <label htmlFor="prix">Prix :</label>
                <input name="prix" required />
                <label htmlFor="description">Description :</label>
                <input name="description" required />
                <input type="submit" value="Ajouter" />
            </form>
            {products.map((el) => {
                return (<Product key={el.id} id={el.id} image={el.photo} nom={el.nom} prix={el.prix} description={el.description} admin={true} />)
            })}
        </div>
    )
}