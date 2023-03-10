const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) =>{
    const {username, password} = req.body;
    if (username && password) {
        const foundUser = await User.findOne( {username:username} );
        if (foundUser) {
            var result = await bcrypt.compare(password, foundUser.password);
            if (result === true) {
                const token = await foundUser.generateAuthToken();
                return res.status(200).json({user: foundUser, token: token});
            }
        }
        return res.status(400).json({user: false});
    }
    return res.status(400).json({user: false});
})

module.exports = router;
