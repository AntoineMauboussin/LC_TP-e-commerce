const db = require("../data/database");

function addOrder(id) {
    return new Promise((resolve, rej) => {
        db.run("INSERT INTO 'order' (date, status, id_user) VALUES (DATE(),?,?)", ["Validé", id], function (err, res) {
            if (err) rej(err)
            resolve({ mess: "Commande ajoutée", id: this.lastID })
        })
    })
}

function addOrderLine(id_article, id_order, quantity) {
    return new Promise((resolve, rej) => {
        db.run("INSERT INTO 'order_line' (id_article,id_order,quantity) VALUES (?,?,?)", [id_article,id_order,quantity], function (err, res) {
            if (err) rej(err)
            resolve({ mess: "Ligne ajoutée", id: this.lastID })
        })
    })
}

function getAllOrders() {
    return new Promise((resolve, rej) => {
        db.all("SELECT * FROM 'order' o", (err, res) => {
            if (err) rej(err)
            resolve(res)
        })
    })

}

function updateStatus(id,status) {
    return new Promise((resolve, rej) => {
        db.run("UPDATE 'order' SET status=? WHERE id=?", [status, id], (err, res) => {
            if (err) rej(err)
            resolve({ mess: "Statut modifié" })
        })
    })
}

module.exports = {
    addOrder,
    addOrderLine,
    getAllOrders,
    updateStatus
}