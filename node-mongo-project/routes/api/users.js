///in this file we are creating API's for our backend
const express = require("express");///we are using express framework  here
const router = express.Router();///defines the method get post etc... for the request made by the client
const uuid = require("uuid");///this gives an id to the user for identifying the user when he makes an request from the root of the browser and 
let users = require("../../Users");

//to get all the users as it is stored in Users.js acts as a database

router.get("/", (req, res) => {///to the root directory
    res.json(users);///here we get the response in the form of data to client from the server in json format document
});



///now we are trying to filter the users on the basis of their id 
router.get("/:id", (req, res) => {///eg id =2
    const found = users.some(user => user.id === parseInt(req.params.id))///req.params.id is the id which the user wants from the get request req.params.id retireves value in the form of string and whole line returns TRUE or FALSE
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))///here we give === as strictly checks for both datatype and the value its not like if we give "2"as get request and the id is 2 too then contradiction so to avoid this we use ===so filter () filters the required data from users array
    }
    else {
        res.sendStatus(400)
    }
})

///creating a new user

///by post method we are requesting by sending some data and creating new record in the backend
router.post("/", (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
    }

    if (!newUser.name || !newUser.email) {
        return res.sendStatus(400)
    }

    users.push(newUser)
    res.json(users)
})

///update the record 

router.put("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        const updateUser = req.body;///extracts data sent by the client and then assigns it to the user
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name : user.name///here it checks whether the updateUser variable has the name property extracted from the url of the client or not if yes then perform the operation
                user.email = updateUser.email ? updateUser.email : user.email
                res.json({ msg: "User Updated", user })
            }
        })
    }
})

router.delete("/:id", (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id))

    if (found) {
        users = users.filter((user) => user.id !== parseInt(req.params.id))
        res.json({
            msg: "user deleted",
            users,
        });
    }
    else {
        res.sendStatus(400)
    }
});

module.exports = router

////till here we haev completed the intro to API in postman

