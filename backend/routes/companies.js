const { Router } = require('express');
const router = Router();
const { _sequelize } = require('../config/database');
const { authToken } = require('../auth/auth.js');
const { QueryTypes } = require('sequelize');
const { body, validationResult } = require('express-validator');

router.get('/', authToken, async (req, res) => {
  try{
    const companies = await _sequelize.query(
      `SELECT
        companies.companyId,
        companies.c_name,
        companies.email,
        companies.phone,
        companies.adress,
        cities.city_name,
        regions.reg_name,
        countries.count_name
      FROM companies
      INNER JOIN cities ON companies.cityId = cities.cityId
      INNER JOIN regions ON companies.regionId = regions.regionId
      INNER JOIN countries ON companies.countryId = countries.countryId`,
      {
        type: QueryTypes.SELECT
      }
    );
    res.status(200).json(companies);
  } 
  catch (error) {
    res.status(504).send({ message: 'Server error', data: error.code });
  }
});

router.get('/:companyId', authToken, async (req, res) => {
  const companyId = +req.params.companyId;
  try {
    const companyData = await _sequelize.query(
      `SELECT * FROM companies WHERE companyId = :companyId`, 
        {
          replacements: { companyId },
          type: QueryTypes.SELECT
        }
    );
    return res.status(200).json(companyData);
  }
  catch (error){
    res.status(404).send({ message: 'The company does not exist'})  }
});

router.post(
  '/',
  authToken,
  body('c_name').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').not().isEmpty().trim().escape(),
  body('adress').not().isEmpty().trim().escape(),
  body('cityId').not().isEmpty().trim().escape(),
  body('countryId').not().isEmpty().trim().escape(),
  body('regionId').not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { c_name, email, phone, adress, cityId, countryId, regionId } = req.body; 
    try {
      await _sequelize.query(
        'INSERT INTO companies (c_name, email, phone, adress, cityId, countryId, regionId) VALUES (:c_name, :email, :phone, :adress, :cityId, :countryId, :regionId)',
        { 
          replacements: { c_name, email, phone, adress, cityId, countryId, regionId },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).send({ message: 'The item has been saved'});
    }
    catch (error) {
      console.log(error);
      res.status(400).send({ message: 'DB constraint error', data: error.data });
    }
  }
);

router.delete('/:companyId', authToken, async (req, res) => {
  const companyId = +req.params.companyId;
  try {  
    await _sequelize.query(
      `DELETE FROM companies WHERE companyId = :companyId`,
      {
        replacements: { companyId },
        type: QueryTypes.DELETE,
      }
    )
    res.status(200). send({ message: 'The item has been deleted' });
  }
  catch (error) {
    res.status(404).send({ message: 'The company does not exist'})
  }
});

router.put(
    '/:companyId',
    authToken,
    body('c_name').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').not().isEmpty().trim().escape(),
    body('adress').not().isEmpty().trim().escape(),
    body('cityId').not().isEmpty().trim().escape(),
    body('countryId').not().isEmpty().trim().escape(),
    body('regionId').not().isEmpty().trim().escape(),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'The item could not been updated' });
    };
    const { c_name, email, phone, adress, cityId, countryId, regionId } = req.body; 
    const companyId = +req.params.companyId;
    try{    
      await _sequelize.query(
        `UPDATE companies SET c_name = :c_name, email = :email, phone = :phone, adress = :adress, cityId = :cityId, countryId = :countryId, regionId = :regionId WHERE companyId = :companyId`,
        { 
          replacements: { c_name, email, phone, adress, cityId, countryId, regionId, companyId },
          type: QueryTypes.UPDATE,
        }
      );
      res.status(200).send({ message: 'The update has been succesfull' });
    }
    catch (error) {
      res.status(404).send({ message: 'The company does not exist'})
    }  
});

module.exports = router