const mongodb = require('../models/contacts-data');
const { ObjectId } = require('mongodb'); // Cleaner way to pull it out
const getAllContacts = async (req, res) => {
    const db = mongodb.getDb();
    
    // This will list EVERY collection name in your database
    const collections = await db.listCollections().toArray();
    console.log("Collections found:", collections.map(c => c.name));

    const contacts = await db.collection('users').find().toArray();
    res.json(contacts);
};

const getContactById = async (req, res) => {
    try {
        const db = mongodb.getDb();
        
        // 1. Convert string ID to MongoDB ObjectId
        const contactId = new ObjectId(req.params.id);
        
        // 2. Query the database
        const contact = await db.collection('users').findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        // If the ID sent is not a valid 24-character hex string, ObjectId will throw an error
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

module.exports = {
    getAllContacts,
    getContactById
};