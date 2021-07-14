const jwt = require('jsonwebtoken');

function authToken (req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) { 
        return res.status(403).send({ message: 'Access denied!' }) 
    }
    jwt.verify(token, process.env.TOKENSECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).send({ message: 'Unauthorized request!' });
        } else {
            req.user = user;
            next();
        }
    });
}

function authRole(role) {
    return (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.TOKENSECRET, function(err, decoded){
            if(err) {
                return res.status(403).send({ message: 'Action forbidden', err })
            };
            if (decoded.role !== role) {
                return res.status(403).send({ message: 'Action not allowed', err })
            }
            if (decoded.role === role) {
                next();
            }
        })
    }
}

module.exports = { authRole, authToken }