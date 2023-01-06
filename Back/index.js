const express = require('express')
const userRouter = require('./routeur/utilisateur')
const articleRouter = require('./routeur/articles')
const orderRouter = require('./routeur/orders')
const db = require('./data/database')
const app = express()
const cors = require('cors');

app.use(cors({origin: '*'}));


app.use(express.static("./assets")) //fichiers statiques
app.use(express.json()) //body en json API Rest


app.get("/", (req, res) => {
    res.send("<h1>Bienvenue sur l'API ecommerce</h1>")
})

app.use('/user', userRouter)
app.use('/product', articleRouter)
app.use('/order', orderRouter)


app.listen(3000)

