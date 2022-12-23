const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) =>{
    const {name, username, password} = req.body;
    if (name && username && password) {
        const foundUser = await User.findOne( {username:username} );
        if (foundUser) {
            return res.status(400).json({error: "Username already exists"});
        } else {
            const data = {
                name: req.body.name,
                username: req.body.username
            }
            data.password = await bcrypt.hash(password, 10);
            User.create(data)
            .then(async (user) => {
                const token = await user.generateAuthToken();
                console.log('user',user);
                return res.status(200).json({user: user, token: token});
            })
        }
    } else {
        return res.status(400).json({error: "Please make sure each field has valid value."});
    }
})


module.exports = router;
