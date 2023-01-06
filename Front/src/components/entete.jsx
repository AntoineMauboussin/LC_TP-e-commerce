import { useContext } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../contexte/ecommerce";

export function Entete() {
    const { token,admin } = useContext(EcommerceContext);
    return (
        <header>
            <h1>LC e-commerce</h1>
            <nav>
                <Link to="/">Catalogue</Link>
                <Link to="/panier">Panier</Link>
                {(token !== "") ?
                    <>
                        {(admin) ?
                            <>
                            <Link to="/dashboard">Dashboard</Link>
                            </>
                            :
                            <>
                            </>
                        }
                        <Link to="/logout">Déconnexion</Link>
                    </>
                    :
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register">Inscription</Link>
                    </>
                }

            </nav>
        </header>
    )
}