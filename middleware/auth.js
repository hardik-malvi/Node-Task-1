const jwt = require('jsonwebtoken');
const jwtkey = "jwt";

exports.verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        jwt.verify(token, jwtkey, (err, authData) => {
            if (err) {
                res.send({ result: err })
            }
            else {
                req.payload = authData;
                next();
            }
        })
    }
    else {
        res.status(401).json({
            "data": [],
            "status": 0,
            Message: 'token not provid'
        })
    }
}