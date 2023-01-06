export function postPanier(token, tab, id) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/order", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({tab:tab, id:id})
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}

export function getAllOrders(token) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/order", {
            method: "GET",
            headers: {
                'Content-type': "application/json",
                'Authorization': 'Bearer '+token
            },
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}

export function changeStatus(token,id,status) {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:3000/order/"+id, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({status:status})
        }).then(res => res.json())
            .then(data => {
                return resolve(data)
            })
            .catch(err => reject(err))
    })
}