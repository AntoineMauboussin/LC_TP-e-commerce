const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    let token = ""
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
        let decoded = false;
        try{
            decoded = jwt.verify(token, 'ma super clé');
        }catch(error){

        }
        if (decoded && decoded.user) {
            req.user = { mail: decoded.user, niveau: decoded.niveau }
            next()
        }
        else {
            res.status(401).json({ mess: "Vous devez être connecté ou administrateur" })
        }
    } else {
        res.status(401).json({ mess: "Vous devez être connecté ou administrateur" })
    }

}
module.exports = checkToken