const { Router } = require('express');
const router = Router();
const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { authToken } = require('../auth/auth.js');
const { body, validationResult } = require('express-validator');
const { findCity } = require('../controllers/city_controller');
 
router.get('/countryId/:countryId', authToken, async (req, res) => {
    const countryId = +req.params.countryId; 
    const cities = await _sequelize.query(
        'SELECT * FROM cities WHERE countryId = :countryId',
        {
            replacements: { countryId },
            type: QueryTypes.SELECT
        }
    );
    if(cities !== null) {        
        res.status(200).json(cities);
    } else {
        res.status(400);
    }
});

router.post(
    '/',
    authToken,
    body('city_name').not().isEmpty().trim().escape(),
    body('countryId').not().isEmpty().trim().escape(),
    body('regionId').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        const { city_name, countryId, regionId } = req.body; 
        try { 
            await _sequelize.query(
                'INSERT INTO cities (city_name, countryId, regionId) VALUES (:city_name, :countryId, :regionId)',
                { 
                    replacements: { city_name, countryId, regionId },
                    type: QueryTypes.INSERT,
                }
            );
            res.status(200).send({ message: 'The item has been saved'});
        }
        catch (error) {
            res.status(400).send({ message: 'DB constraint error', data: error.code });
        }
    }
);

router.get('/:cityId', authToken, async (req, res) => {
    const cityId = +req.params.cityId;
    const cityData = await _sequelize.query(
      `SELECT * FROM cities WHERE cityId = :cityId`, 
        {
          replacements: { cityId },
          type: QueryTypes.SELECT
        }
    );
    if(cityData.length === 0) {
        return res.status(404).send({ message: 'Not found'});
    } else {
        return res.status(200).json(cityData);
    }
});

router.put(
    '/:cityId',
    authToken,
    body('city_name').not().isEmpty().trim().escape(),
    body('countryId').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);  
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'The item could not been updated' });
        };
        const { city_name, countryId } = req.body;
        const cityId = +req.params.cityId;
        await _sequelize.query(
            `UPDATE cities SET city_name = :city_name, countryId = :countryId WHERE cityId = :cityId`,
            { 
            replacements: { city_name, countryId, cityId },
            type: QueryTypes.UPDATE,
            }
        );
        res.status(200).send({ message: 'The update has been succesfull' });
    }
);

router.delete('/:cityId', authToken, async (req, res) => {
    const cityId = +req.params.cityId;
    if (!findCity(cityId)) {
        res.status(404).send({ message: 'The item does not exist'})
    }
    if (findCity(cityId)) {
        await _sequelize.query(
            `DELETE FROM cities WHERE cityId = :cityId`,
            {
                replacements: { cityId },
                type: QueryTypes.DELETE,
            }
        )
        res.status(200). send({ message: 'The item has been deleted' });
    }
});
    
module.exports = router