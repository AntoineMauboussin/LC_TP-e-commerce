export function postProduct(token,image,nom,description,prix) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/product", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({ photo:image,nom:nom, desc: description,prix:prix })
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}

export function modifyProduct(token,id,image,nom,description,prix) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/product/"+id, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({ photo:image,nom:nom, desc: description,prix:prix })
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}

export function getProducts() {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/product", {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            return resolve(data)
        })
        .catch(err => reject(err))
    })
}

export function getSingleProduct(id) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/product/"+id, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            return resolve(data)
        })
        .catch(err => reject(err))
    })
}