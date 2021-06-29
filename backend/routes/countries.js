const { Router } = require('express');
const router = Router();
const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { body, validationResult } = require('express-validator');
const { findCountry } = require('../controllers/country_controller');
const { authToken } = require('../auth/auth.js');

router.get('/regionId/:regionId', authToken, async (req, res) => {
    const regionId = +req.params.regionId; 
    const countries = await _sequelize.query(
        'SELECT * FROM countries WHERE regionId = :regionId',
        {
            replacements: { regionId },
            type: QueryTypes.SELECT
        }
    );
    if(countries !== null) {
        console.log(countries);
        res.status(200).json(countries);
    } else {
        res.status(400);
    }
});

router.post(
    '/',
    authToken,
    body('count_name').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        const { count_name, regionId } = req.body; 
        const alreadyExistCountry = await _sequelize.query(
            'SELECT * FROM countries WHERE count_name = :count_name',
            {
                replacements: { count_name },
                type: QueryTypes.SELECT,
            }
        );
        if (alreadyExistCountry.length > 0) {
            return res.status(409).send({ error: 'The item already exists!' }).end();
        } else {
            await _sequelize.query(
            'INSERT INTO countries (count_name, regionId) VALUES (:count_name, :regionId)',
            { 
                replacements: { count_name, regionId },
                type: QueryTypes.INSERT,
            }
            );
            res.status(200).send({ message: 'The item has been saved'});
        }
    }
);

router.get('/:countryId', authToken, async (req, res) => {
    const countryId = +req.params.countryId;
    const countryData = await _sequelize.query(
      `SELECT * FROM countries WHERE countryId = :countryId`, 
        {
          replacements: { countryId },
          type: QueryTypes.SELECT
        }
    );
    if(countryData.length === 0) {
        return res.status(404).send({ message: 'Not found'});
    } else {
        return res.status(200).json(countryData);
    }
});

router.put(
    '/:countryId',
    authToken,
    body('count_name').not().isEmpty().trim().escape(),
    body('regionId').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);  
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'The item could not been updated' });
        };
        const { count_name, regionId } = req.body;
        const countryId = +req.params.countryId;
        await _sequelize.query(
            `UPDATE countries SET count_name = :count_name, regionId = :regionId WHERE countryId = :countryId`,
            { 
            replacements: { count_name, regionId, countryId },
            type: QueryTypes.UPDATE,
            }
        );
        res.status(200).send({ message: 'The update has been succesfull' });
        }
);

router.delete('/:countryId', authToken, async (req, res) => {
    const countryId = +req.params.countryId;
    if (!findCountry(countryId)) {
        res.status(404).send({ message: 'The item does not exist'})
    }
    if (findCountry(countryId)) {
        await _sequelize.query(
            `DELETE FROM countries WHERE countryId = :countryId`,
            {
                replacements: { countryId },
                type: QueryTypes.DELETE,
            }
        )
        res.status(200). send({ message: 'The item has been deleted' });
    }
});
    
module.exports = router