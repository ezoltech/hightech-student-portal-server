const jwt = require('jsonwebtoken');
const middlewares = {};
require("dotenv").config();

middlewares.auth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    // check for token 
    if (!token) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }

    try {
        //verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ msg: 'Session expired' })
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: "Internal error check the server log!!",
        });
    }
}

module.exports = middlewares;