const { Router } = require('express');
const router = Router();
const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { body, validationResult } = require('express-validator');
const { findRegion } = require('../controllers/region_controller');
const { authToken } = require('../auth/auth.js');

router.get('/', authToken, async (req, res) => {
  const regions = await _sequelize.query(
    'SELECT * FROM regions',
    {
      type: QueryTypes.SELECT
    }
  );
  if(regions !== null) {
    res.status(200).json(regions);
  } else {
    res.status(400);
  }
});

router.post(
  '/',
  authToken,
  body('reg_name').not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    const { reg_name } = req.body; 
    const alreadyExistRegion = await _sequelize.query(
      'SELECT * FROM regions WHERE reg_name = :reg_name',
      {
        replacements: { reg_name },
        type: QueryTypes.SELECT,
      }
    );
    if (alreadyExistRegion.length > 0) {
      return res.status(409).send({ error: 'The item already exists!' }).end();
    } else {
      await _sequelize.query(
        'INSERT INTO regions (reg_name) VALUES (:reg_name)',
        { 
          replacements: { reg_name },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).send({ message: 'The item has been saved'});
    }
  }
);

router.get('/:regionId', authToken, async (req, res) => {
  const regionId = +req.params.regionId;
  const regionData = await _sequelize.query(
    `SELECT * FROM regions WHERE regionId = :regionId`, 
    {
      replacements: { regionId },
      type: QueryTypes.SELECT
    }
  );
  if(regionData.length === 0) {
    return res.status(404).send({ message: 'Not found'});
  } else {
    return res.status(200).json(regionData);
  }
});

router.delete('/:regionId', authToken, async (req, res) => {
  const regionId = +req.params.regionId;
  if (!findRegion(regionId)) {
    res.status(404).send({ message: 'The item does not exist'})
  }
  if (findRegion(regionId)) {
    await _sequelize.query(
      `DELETE FROM regions WHERE regionId = :regionId`,
      {
        replacements: { regionId },
        type: QueryTypes.DELETE,
      }
    )
    res.status(200). send({ message: 'The item has been deleted' });
  }
});

module.exports = router