const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// router.get('/api/contacts', contactsController.getAllContacts);
router.get('/', contactsController.getAllContacts);
router.get('/contacts/:id', contactsController.getContactById);

module.exports = router;