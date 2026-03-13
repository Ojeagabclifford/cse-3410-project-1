const mongodb = require('../models/contacts-data');
const { ObjectId } = require('mongodb'); // Cleaner way to pull it out
const getAllContacts = async (req, res) => {
  const db = mongodb.getDb();

  // This will list EVERY collection name in your database
  const collections = await db.listCollections().toArray();
  console.log(
    'Collections found:',
    collections.map((c) => c.name)
  );

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
    console.error('Error fetching contact:', error);
    // If the ID sent is not a valid 24-character hex string, ObjectId will throw an error
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

const createContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    // contact: firstName, lastName, email, favoriteColor, and birthday.
    const newContact = {
      email: req.body.email,
      Fname: req.body.firstName,
      Lname: req.body.lastName,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await db.collection('users').insertOne(newContact);
    res.status(201).json({ message: 'Contact created', id: result.insertedId });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      email: req.body.email,
      Fname: req.body.firstName,
      Lname: req.body.lastName,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await db.collection('users').updateOne(
      { _id: contactId },
      { $set: updatedContact }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact updated' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ error: 'Invalid ID format' });
  }
}

const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id);
    const result = await db.collection('users').deleteOne({ _id: contactId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(400).json({ error: 'Invalid ID format' });
  } };

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
