const express = require('express')
const { connectUser, newUser } = require('../model/user')
const routeur = express.Router()
//Connect
routeur.post('/connexion', (req, res) => {
    connectUser(req.body.mail, req.body.pass).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//inscription
routeur.post('/inscription', (req, res) => {
    newUser(req.body.mail, req.body.pass).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = routeur