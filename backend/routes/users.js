const { Router } = require('express');
const router = Router();
const { _sequelize } = require('../config/database');
const { body, validationResult } = require('express-validator');
const { QueryTypes } = require('sequelize');
const { createAccountLimiter, findUser } = require('../controllers/user_controller');
const { authRole, authToken } = require('../auth/auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', authToken, authRole(1), async (req, res) => {
  const data = await _sequelize.query(
    `SELECT 
      users.userId,
      users.u_name,
      users.lastname,
      users.email,
      users.adress,
      rols.rol_name 
    FROM users
    INNER JOIN rols ON users.isAdmin = rols.rolId`,
    {
      type: QueryTypes.SELECT
    }
  );
  if(data) {
    res.status(200).json(data);
  } else {
    res.status(400);
  }
});

router.post(
  '/',
  authToken,
  createAccountLimiter,
  authRole(1),
  body('name').not().isEmpty().trim().escape(),
  body('lastname').not().isEmpty().trim().escape(),
  body('adress').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('passwd').isLength({ min: 8 }),
  async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    const { name, lastname, adress, email, role, passwd } = req.body; 
    const alreadyExistUser = await _sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );
    if (alreadyExistUser.length > 0) {
      return res.status(409).send({ error: 'The user already exists!' }).end();
    }
    else {
      const create = await _sequelize.query(
        'INSERT INTO users (u_name, lastname, adress, email, isAdmin) VALUES (:name, :lastname, :adress, :email, :role)',
        { 
          replacements: { name, lastname, adress, email, role },
          type: QueryTypes.INSERT,
        }  
      );
      const newUserId = +create[0];
      bcrypt.hash(passwd, saltRounds, async function(err, hash) {
        await _sequelize.query(
          'INSERT INTO auths (auth_pass, userId) VALUES (:hash, :newUserId)',
          {
            replacements: { hash, newUserId},
            type: QueryTypes.INSERT,
          }
        );
      });
      res.json({ message: 'The new user has been registered' });
    }
  }
);

router.get('/:userId', authToken, async (req, res) => {
  const userId = +req.params.userId;
  const userData = await _sequelize.query(
    `SELECT * FROM users WHERE userId = :userId`, 
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
  );
  if(userData.length === 0) {
    return res.status(404).send({ message: 'Not found'});
  } else {
    return res.status(200).json(userData);
  }
});

router.put(
  '/:userId',
  authToken,
  body('email').isEmail().normalizeEmail(),
  body('adress').not().isEmpty().trim().escape(),
  body('passwd').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).send({ message: 'The account could not been updated' });
    };
    const { email, adress, role, passwd } = req.body;
    const userId = +req.params.userId;
    await _sequelize.query(
      `UPDATE users SET email = :email, adress = :adress, isAdmin = :role WHERE userId = :userId`,
      { 
        replacements: { email, adress, role, userId },
        type: QueryTypes.UPDATE,
      }
    );
    const user = findUser(userId);
    if (user.userId === userId) {  
      bcrypt.hash(passwd, saltRounds, async function(err, hash) {
        await _sequelize.query(
          `UPDATE auths SET auth_pass = :hash WHERE userId = :userId`,
          {
            replacements: { hash, userId },
            type: QueryTypes.UPDATE,
          }
        )
      });
    } 
    res.status(200).send({ message: 'The update has been succesfull' });
  }
);

router.delete('/:userId', authToken, authRole(1), async (req, res) => {
  const userId = +req.params.userId;
  if (!findUser(userId)) {
    res.status(404).send({ message: 'The user does not exist'})
  }
  if (findUser(userId)) {
    await _sequelize.query(
    `DELETE FROM users WHERE userId = :userId`,
      {
        replacements: { userId },
        type: QueryTypes.DELETE,
      }
    )
    await _sequelize.query(
      `DELETE FROM auths WHERE userId = :userId`,
      {
        replacements: { userId },
        type: QueryTypes.DELETE,
      }
    )
    res.status(200). send({ message: 'User id has been deleted' });
  }
});

module.exports = router