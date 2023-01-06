const express = require('express')
const checkToken = require('../middleware/checkToken')
const { getAllOrders, addOrder, addOrderLine, updateStatus } = require('../model/order')
const routeur = express.Router()

routeur.post('/', checkToken, (req, res) => {
    if (req.user.niveau >= 0) {
        addOrder(req.body.id).then(data => {
            req.body.tab.forEach(el => {
                addOrderLine(el[0],data.id, el[1])
            })
        }).then(
            res.status(200).json({ mess: "Commande ajoutée" })
        ).catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(403).json({ mess: "Vous devez être connecté" })
    }
})
//get ALL
routeur.get('/',checkToken, (req, res) => {
    if (req.user.niveau === 1) {
        getAllOrders().then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(403).json({ mess: "Vous devez être administrateur" })
    }
})

routeur.put('/:id', checkToken, (req, res) => {
    if (req.user.niveau === 1) {
        updateStatus(req.params.id, req.body.status).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(403).json({ mess: "Vous devez être administrateur" })
    }
})


module.exports = routeur