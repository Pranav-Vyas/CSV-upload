const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");

const authenticate =  async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const verifyToken = jwt.verify(token, process.env.KEY);
        const foundUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!foundUser) {
            throw new Error("User not found");
        }
        req.token = token;
        req.foundUser = foundUser;
        req.userId = foundUser._id;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send("Unauthorised access");
    }
}

module.exports = authenticate;

