import { useContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { changeStatus, getAllOrders } from "../api/panier"
import { EcommerceContext } from "../contexte/ecommerce";
import { Product } from '../components/product'

export function ListeCommandes() {
    const [refresh, setRefresh] = useState(true)
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState("")
    const { token,setToken, setAdmin } = useContext(EcommerceContext);
    const navigate = useNavigate()

    useEffect(() => {
        getAllOrders(token).then(data => {
            setOrders(data)
            setMessage(data.mess)
        }).catch((error) => {
            console.error('Error:', error);
        });
    },[refresh]);

    const modifyStatus = (id,status) => {
        changeStatus(token,id,status).then(() => {
            setRefresh(!refresh)
        })
    }
    return (
        <div className="mt">
            {(token !== "") ?
                    orders.map((el) => {
                        return (
                            <div key={el.id}>
                                <p>{el.id}. Date: {el.date}</p>
                                <select value={el.status}  onChange={(e)=>modifyStatus(el.id, e.target.value)} name="status">
                                    <option value="Payé">Payé</option>
                                    <option value="Validé">Validé</option>
                                    <option value="Livré">Livré</option>
                                    <option value="Annulé">Annulé</option>
                                </select>
                            </div>
                        )
                    })
                    :
                    <p className="message">{message}</p>
            }
            
        </div>
    )
}