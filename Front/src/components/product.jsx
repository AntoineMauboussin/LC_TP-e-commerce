import { useContext, useState } from "react"
import { EcommerceContext } from "../contexte/ecommerce";
import { modifyProduct } from "../api/product"
import { Link } from "react-router-dom";

export function Product(props) {

    const [message, setMessage] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [nom, setNom] = useState(props.nom)
    const [prix, setPrix] = useState(props.prix)
    const [adminMode, setAdminMode] = useState(props.admin)
    const [description, setDescription] = useState(props.description)
    const [image, setImage] = useState(props.image)
    const {panier,setPanier,token} = useContext(EcommerceContext);

    const submitForm = (e) => {
        e.preventDefault()
        modifyProduct(token, props.id, image, nom, description, prix).then(data => {
            setMessage(data.mess)
        })
    }

    const addPanier = (e) => {
        if(quantity === 0) return
        let n = -1
        let nquantity = 0
        let newPanier = panier
        panier.forEach((el,i) => {
            if(el[0] === props.id){
                n = i
                nquantity = el[1]
            }
        })
        if(n>=0){
            newPanier[n] = [props.id, parseInt(nquantity)+parseInt(quantity), nom, prix]
        }else{
            newPanier.push([props.id, parseInt(quantity), nom, prix])
        }
        setPanier(newPanier)
        setMessage("Ajouté au panier")
    }

    return (
        <>
        {(adminMode)?

            <form className="product-form" onSubmit={submitForm}>
                <img src={image}></img>
                <label htmlFor="image">Url de l'image :</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} />
                <label htmlFor="nom">Nom :</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)} />
                <label htmlFor="prix">Prix :</label>
                <input value={prix} onChange={(e) => setPrix(e.target.value)} />
                <label htmlFor="description">Description :</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type='hidden' value={props.id} />
                <input type="submit" value="Modifier" />
                <p className="message">{message}</p>
            </form>
            :
            <div className="product-form">
                <Link to={"/product/"+props.id}>
                    <img src={image}></img>
                    <p>{nom}</p>
                    <p>{prix}€</p>
                    <p>{description}</p>
                </Link>
                <label htmlFor="quantity">Quantité :</label>
                <input name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <button onClick={addPanier}>Ajouter au panier</button>
                <p className="message">{message}</p>
            </div>
        }
        </>
    )
}