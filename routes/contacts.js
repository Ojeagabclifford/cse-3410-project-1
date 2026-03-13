const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// router.get('/api/contacts', contactsController.getAllContacts);
router.get('/', contactsController.getAllContacts);
router.get('/contacts/:id', contactsController.getContactById);

router.post('/', contactsController.createContact);
router.put('/contacts/:id', contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);   

module.exports = router;
