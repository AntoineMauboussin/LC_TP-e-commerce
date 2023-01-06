const db = require("../data/database");
const jwt = require('jsonwebtoken');

function connectUser(email, pass) {
    return new Promise((resolve, rej) => {
        db.get("SELECT * FROM user WHERE email=?", email, (err, res) => {
            if (err) rej(err)
            if (res && res.pass == pass) {
                const token = jwt.sign({ user: res.email, niveau: res.niveau }, 'ma super clé');
                resolve({ token, valid:true, niveau:res.niveau, id: res.id})
            }
            resolve({ mess: "Combinaison utilisateur/mot de passe incorrecte", valid:false })
        })
    })
}
function newUser(email, pass) {
    return new Promise((resolve, rej) => {
        db.run("INSERT INTO user (email,pass,niveau) VALUES(?,?,0)", [email, pass], function (err, res) {
            if (err) rej(err)
            resolve({ mess: "utilisateur ajouté", id: this.lastID })
        })
    })
}

module.exports = {
    connectUser,
    newUser
}