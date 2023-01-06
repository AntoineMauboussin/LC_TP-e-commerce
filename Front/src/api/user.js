export function connectUser(mail, pass) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/user/connexion", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ mail, pass })
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}

export function registerUser(mail, pass) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/user/inscription", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ mail, pass })
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}