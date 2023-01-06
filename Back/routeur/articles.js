const express = require('express')
const checkToken = require('../middleware/checkToken')
const { getAllArticles, getArticleById, addArticle, updateArticle, deleteArticle } = require('../model/article')
const routeur = express.Router()

//get ALL
routeur.get('/', (req, res) => {
    getAllArticles().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})
//get One
routeur.get('/:id', (req, res) => {
    getArticleById(req.params.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})
//Add
routeur.post('/', checkToken, (req, res) => {
    if (req.user.niveau === 1) {
        addArticle(req.body.nom, req.body.desc, req.body.prix, req.body.photo).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(403).json({ mess: "Vous devez être administrateur" })
    }
})
//Modif
routeur.put('/:id', checkToken, (req, res) => {
    if (req.user.niveau === 1) {
        updateArticle(req.params.id, req.body.nom, req.body.desc, req.body.prix, req.body.photo).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(403).json({ mess: "Vous devez être administrateur" })
    }
})
//Supp
routeur.delete('/:id', (req, res) => {
    if (req.user.niveau === 1) {
        deleteArticle(req.params.id).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(403).json({ mess: "Vous devez être administrateur" })
    }
})

module.exports = routeur