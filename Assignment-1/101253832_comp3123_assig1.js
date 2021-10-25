const express = require('express')
const fs = require('fs')

const app = express()

app.get('/user', (req, res) => {
    //user?uid=?
    let id = req.query.uid

    let data = fs.readFileSync("users.json")
    let user = JSON.parse(data)
    let test = []
    
    for (let i = 0; i < user.length - 1; i++){
        if (user[i].id == id){
            test.push({
                id: user[i].id,
                name: user[i].name,
                email: user[i].email,
                address: `${user[i].address.street}, ${user[i].address.city}, ${user[i].address.zipcode}`,
                phone: user[i].phone
            })
            break
        }
    }

    if (test.length != 0){
        for(let i = 0; i < test.length; i++){
            res.json(test[i])
        }
    }else{
        res.json({
            message: "No user found"
        })
    }
});

app.get('/users/all', (req, res) => {
    let data = fs.readFileSync("users.json")
    users = JSON.parse(data)
    user = sortJSON(users, 'username', true)
    res.send(user)
});

function sortJSON(arr, key, asc) {
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (asc === true) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (asc === false) { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

app.listen(process.env.port || 8089);

console.log('Web Server is listening at port '+ (process.env.port || 8089));