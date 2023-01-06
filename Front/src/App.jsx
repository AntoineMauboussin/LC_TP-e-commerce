import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrPage } from './pages/errPage'
import { Entete } from './components/entete'
import { Login } from './pages/login'
import { Inscription } from './pages/inscription'
import { EcommerceContext } from './contexte/ecommerce'
import { useState } from 'react'
import { Profile } from './pages/profile'
import { Dashboard } from './pages/dashboard'
import { Logout } from './pages/logout'
import { CatalogueAdmin } from './pages/catalogueAdmin'
import { Catalogue } from './pages/catalogue'
import { Detail } from './pages/detail'
import { Panier } from './pages/panier'
import { ListeCommandes } from './pages/listeCommandes'

function App() {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [panier, setPanier] = useState([]);
  const [userId, setUserId] = useState(undefined);
  return (
    <EcommerceContext.Provider value={{userId,setUserId,panier,setPanier, token, setToken, admin, setAdmin }}>
      <BrowserRouter>
        <Entete />
        <Routes>
          <Route path='/' element={<Catalogue />} />
          <Route path='/login' element={<Login />} />
          <Route path='/panier' element={<Panier />} />
          <Route path='/register' element={<Inscription />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/liste-commandes' element={<ListeCommandes />} />
          <Route path='/product/:id' element={<Detail />} />
          <Route path='/catalogue-admin' element={<CatalogueAdmin />} />
          <Route path='*' element={<ErrPage />} />
        </Routes>
      </BrowserRouter>
    </EcommerceContext.Provider>
  )
}

export default App
