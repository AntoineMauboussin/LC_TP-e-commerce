import { Link } from "react-router-dom";

export function Dashboard() {
    return (
        <>
            <div className="mt dashboard">
                <Link to="/catalogue-admin">Catalogue Admin</Link>
                <Link to="/liste-commandes">Liste des commandes</Link>
            </div>
        </>
    )
}