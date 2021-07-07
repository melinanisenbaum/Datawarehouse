const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { _sequelize } = require('../config/database.js');
const { QueryTypes } = require('sequelize');
const { limiter } = require('../controllers/login_controller.js');

router.post('/', async(req, res) => {    //agregar middleware limiter
    const { email, passwd } = req.body;
    const getUser = await _sequelize.query(
        `SELECT * FROM users WHERE email = :email`,
        {
            replacements: { email },
            type: QueryTypes.SELECT
        }
    );   
    if( getUser.length === 0 ) {
        console.log('No existo');
        res.status(400).send({ error: 'Email or password does not match!' }).end();

    }
    if( getUser.length != 0 ) {
        console.log('existo');

        const id = getUser[0].userId;
        const auth_pass = await _sequelize.query(
            `SELECT * FROM auths WHERE userId = :id`, 
            {
                replacements: { id },
                type: QueryTypes.SELECT
            }
        );
        const hash = auth_pass[0].auth_pass;
        const result = bcrypt.compareSync(passwd, hash); 

        if (!result) {
            console.log('Mal pass');

            return res.status(400).send({ error: 'Email or password does not match!' }).end();
        } else {
            const user = {
                id: getUser[0].userId,
                email: getUser[0].email,
                role: getUser[0].isAdmin
            }
            const accessToken = jwt.sign(user, process.env.TOKENSECRET);//, {expiresIn: '30m'});
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKENSECRET);
            res.status(200);
            res.json({ user, accessToken: accessToken, refreshToken: refreshToken });// No esta habilitado
        }
    }
});

module.exports = router