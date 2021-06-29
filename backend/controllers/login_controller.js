const rateLimit = require('express-rate-limit');//seguridad  

function limiter(req, res, next) {
    rateLimit(
        {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }
    );
    next()
}

module.exports = { limiter }