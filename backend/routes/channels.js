const { Router } = require('express');
const router = Router();
const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { authToken } = require('../auth/auth.js');
const { body, validationResult } = require('express-validator');
const { findChannel } = require('../controllers/channel_controller');

router.get('/', authToken, async (req, res) => {
  const channels = await _sequelize.query('SELECT * FROM channels',
    {
      type: QueryTypes.SELECT
    }
  );
  if(channels !== null) {
    res.status(200).json(channels);
  } else {
    res.status(400);
  }
});
router.get('/contact/:contactId', authToken, async (req, res) => {
  const contactId = +req.params.contactId;
  const channels = await _sequelize.query('SELECT * FROM channels WHERE contactId = :contactId',
    {
      type: QueryTypes.SELECT,
      replacements: { contactId }
    }
  );
  if(channels !== null) {
    res.status(200).json(channels);
  } else {
    res.status(400);
  }
});

router.get('/:channelId', authToken, async (req, res) => {
  const channelId = +req.params.channelId;
  const channelData = await _sequelize.query(
    `SELECT * FROM channels WHERE channelId = :channelId`, 
      {
        replacements: { channelId },
        type: QueryTypes.SELECT
      }
  );
  if(channelData.length === 0) {
    return res.status(404).send({ message: 'Not found'});
  } else {
    return res.status(200).json(channelData);
  }
});

router.post(
  '/',
  authToken,
  body('chan_name').not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { chan_name } = req.body; 
    const alreadyExistChannel = await _sequelize.query(
      'SELECT * FROM channels WHERE chan_name = :chan_name',
      {
        replacements: { chan_name },
        type: QueryTypes.SELECT,
      }
    );
    if (alreadyExistChannel.length > 0) {
      return res.status(409).send({ error: 'The item already exists!' }).end();
    } else {
      const createChannel = await _sequelize.query(
        'INSERT INTO channels (chan_name) VALUES (:chan_name)',
        { 
          replacements: { chan_name },
          type: QueryTypes.INSERT,
        }
      );
        res.status(200).send({ message: 'The item has been saved'});
    }
  }
);

router.delete('/:channelId', authToken, async (req, res) => {
  const channelId = +req.params.channelId;
    if (!findChannel(channelId)) {
      res.status(404).send({ message: 'The item does not exist'})
    }
    if (findChannel(channelId)) {
      await _sequelize.query(
        `DELETE FROM channels WHERE channelId = :channelId`,
        {
          replacements: { channelId },
          type: QueryTypes.DELETE,
        }
      )
      res.status(200). send({ message: 'The item has been deleted' });
    }
  });

module.exports = router