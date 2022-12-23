const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

router.get("/logout", middleware, async (req, res) => {
    try {
        req.foundUser.tokens = req.foundUser.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.foundUser.save();
        res.status(200).json({logout: true});
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router;
