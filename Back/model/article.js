const db = require("../data/database");

function getAllArticles() {
    return new Promise((resolve, rej) => {
        db.all("SELECT * FROM articles", (err, res) => {
            if (err) rej(err)
            resolve(res)
        })
    })

}
function getArticleById(id) {
    return new Promise((resolve, rej) => {
        db.get("SELECT * FROM articles WHERE id=?", id, (err, res) => {
            if (err) rej(err)
            resolve(res)
        })
    })
}
function addArticle(nom, desc, prix, photo) {
    return new Promise((resolve, rej) => {
        db.run("INSERT INTO articles (nom,description,prix,photo) VALUES(?,?,?,?)", [nom, desc, prix, photo], function (err, res) {
            if (err) rej(err)
            resolve({ mess: "Article ajouté", id: this.lastID })
        })
    })
}
function updateArticle(id, nom, desc, prix, photo) {
    return new Promise((resolve, rej) => {
        db.run("UPDATE articles SET nom=?,description=?,prix=?,photo=? WHERE id=?", [nom, desc, prix, photo, id], (err, res) => {
            if (err) rej(err)
            resolve({ mess: "Article modifié" })
        })
    })
}
function deleteArticle(id) {
    return new Promise((resolve, rej) => {
        db.run("DELETE FROM articles WHERE id=?", id, (err, res) => {
            if (err) rej(err)
            resolve({ mess: "Article supprimé" })
        })
    })
}
module.exports = {
    getAllArticles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle
}