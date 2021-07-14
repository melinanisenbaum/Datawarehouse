const { Router } = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');
const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { authToken } = require('../auth/auth.js');

router.get('/', authToken, async (req, res) => {
    const { search } = req.body;
    console.log(req.body);
    console.log(search);
    let _query = `SELECT
            contacts.contactId,
            contacts.imgURL,
            contacts.cont_name,
            contacts.cont_lastname,
            contacts.email,
            contacts.interest,
            contacts.adress,
            contacts.charge,
            cities.city_name,
            countries.count_name,
            regions.reg_name,
            companies.c_name
        FROM contacts
        INNER JOIN countries ON contacts.countryId = countries.countryId
        INNER JOIN regions ON contacts.regionId = regions.regionId
        INNER JOIN cities ON contacts.cityId = cities.cityId
        INNER JOIN companies ON contacts.companyId = companies.companyId`;
    let _options = {
        type: QueryTypes.SELECT,
        replacements: { search: `%${search}%` },
        logging: console.log
    };
    
    if (search) {
        _query += ` WHERE contacts.cont_name LIKE :search 
            OR contacts.cont_lastname LIKE :search 
            OR regions.reg_name LIKE :search
            OR companies.c_name LIKE :search
            OR countries.count_name LIKE :search
            OR cities.city_name LIKE :search
            OR contacts.email LIKE :search
            OR contacts.charge LIKE :search`;
        
        // fijarse como funciona con chile y ergentina
    }

    try{
        const data = await _sequelize.query(
            _query, _options
        );
        res.status(200).json(data);
    } 
    catch(error) {
        res.status(504).send({ message: error.message, data: error.code });
    }
  });

  router.post(
    '/',
    authToken,
    body('imgURL').isEmpty().trim().escape(),
    body('cont_name').not().isEmpty().trim().escape(),
    body('cont_lastname').not().isEmpty().trim().escape(),
    body('charge').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('adress').not().isEmpty().trim().escape(),
    body('interest').isInt(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('error de verificacion de campos');
            return res.status(400).json({ errors: errors.array() });
            
        };
        const { imgURL, cont_name, cont_lastname, charge, email, companyId, adress, interest, cityId, countryId, regionId, channels } = req.body; 
        //const imgPath = '../uploads/' + req.file.filename; ver video fazt add images con multer
        try {
            const alreadyExistContact = await _sequelize.query(
                'SELECT * FROM contacts WHERE email = :email',
                {
                  replacements: { email },
                  type: QueryTypes.SELECT,
                }
            );
            if (alreadyExistContact.length > 0) {
                return res.status(409).send({ error: 'The contact already exists!' }).end();
            } else {
                const create = await _sequelize.query(
                    'INSERT INTO contacts (imgURL, cont_name, cont_lastname, charge, email, companyId, adress, interest, cityId, countryId, regionId) VALUES (:imgURL, :cont_name, :cont_lastname, :charge, :email, :companyId, :adress, :interest, :cityId, :countryId, :regionId)',
                    { 
                        replacements: { imgURL, cont_name, cont_lastname, charge, email, companyId, adress, interest, cityId, countryId, regionId },
                        type: QueryTypes.INSERT,
                    }
                );
                if (channels.length !== 0) {
                    const contactId = +create[0];
                    channels.forEach( async (_chan) => {
                        const channelId = _chan.channelId;
                        const account = _chan.account;
                        const prefId = _chan.preferenceId;
                        await _sequelize.query(
                            'INSERT INTO contact_channel (channelId, contactId, account, prefId) VALUES (:channelId, :contactId, :account, :prefId)',
                            { 
                                replacements: { channelId, contactId, account, prefId },
                                type: QueryTypes.INSERT,
                            }
                        );
                    });
                }
                res.status(200).send({ message: 'The contact has been saved'});
            }
        }
        catch(error) {
            res.status(400).send({ message: error.message, data: error.data });
        }
    }
);

router.get('/:contactId', authToken, async (req, res) => {
    const contactId = +req.params.contactId;

    try {
        const contactData = await _sequelize.query(
            `SELECT
                contacts.imgURL,
                contacts.cont_name,
                contacts.cont_lastname,
                contacts.email,
                contacts.interest,
                contacts.adress,
                contacts.charge,
                contacts.cityId,
                contacts.regionId,
                contacts.countryId,
                contacts.companyId,
                cities.city_name,
                countries.count_name,
                regions.reg_name,
                companies.c_name
            FROM contacts
            INNER JOIN countries ON contacts.countryId = countries.countryId
            INNER JOIN regions ON contacts.regionId = regions.regionId
            INNER JOIN cities ON contacts.cityId = cities.cityId
            INNER JOIN companies ON contacts.companyId = companies.companyId
            WHERE contactId = :contactId`, 
            {
                replacements: { contactId },
                type: QueryTypes.SELECT
            }
        );
        const contChannels = await _sequelize.query(
            `SELECT 
                contact_channel.channelId,
                contact_channel.prefId,
                contact_channel.account,
                channels.chan_name,
                preference.pref_name
            FROM contact_channel
            INNER JOIN channels ON contact_channel.channelId = channels.channelId
            INNER JOIN preference ON contact_channel.prefId = preference.prefId
            WHERE contactId = :contactId`,
            {
                replacements: { contactId },
                type: QueryTypes.SELECT
            }
        );
        if (contChannels.length > 0) {
            return res.status(200).json({ contactData, contChannels });
        } else {
            return res.status(200).json(contactData);
        }
    }
    catch (error){
        console.log(error);
        res.status(404).send({ message: 'The contact does not exist'})  }
  });

  router.put(// debe haber algun error en los campos porque no me deja modificar
    '/:contactId',
    authToken,
    body('imgURL').isEmpty().trim().escape(),
    body('cont_name').not().isEmpty().trim().escape(),
    body('cont_lastname').not().isEmpty().trim().escape(),
    body('charge').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('companyId').isInt(),
    body('phone').not().isEmpty().trim().escape(),
    body('adress').not().isEmpty().trim().escape(),
    body('interest').isInt(),
    body('cityId').isInt(),
    body('countryId').isInt(),
    body('regionId').isInt(),
    body('channels').isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Some field has a error' });
        };
        const { imgURL, cont_name, cont_lastname, charge, email, companyId, phone, adress, interest, countryId, regionId, cityId } = req.body; 
        const contactId = +req.params.contactId;
        try {    
            await _sequelize.query(
                `UPDATE contacts SET imgURL = :imgURL, cont_name = :cont_name, cont_lastname = :cont_lastname, charge = :charge, email = :email, companyId = :companyId, phone = :phone, adress = :adress, interest = :interest, preferred_channel = :preferred_channel, countryId = :countryId, regionId = :regionId
                WHERE contactId = :contactId`,
                { 
                replacements: { contactId, imgURL, cont_name, cont_lastname, charge, email, companyId, phone, adress, interest, preferred_channel, countryId, regionId },
                type: QueryTypes.UPDATE,
                }
            );
            res.status(200).send({ message: 'The update has been succesfull' });
        }
        catch (error) {
            console.log(error);
            res.status(404).send({ message: 'The contact does not exist'})
        }  
});

router.delete('/:contactId', authToken, async (req, res) => {
    const contactId = +req.params.contactId;
    try {  
        const deleteContact = await _sequelize.query(
            `DELETE FROM contacts WHERE contactId = :contactId`,
            {
                replacements: { contactId },
                type: QueryTypes.DELETE,
            }
        );
        if (deleteContact) {
            await _sequelize.query(
                `DELETE FROM contact_channel WHERE contactId = :contactId`,
                {
                    replacements: { contactId },
                    type: QueryTypes.DELETE,
                }
            );
        }          
        res.status(200). send({ message: 'The item has been deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ message: 'The item does not exist', data: error.data})
    }
});

module.exports = router