const routes = require('express').Router();
const contacts = require('./contacts');

routes.use('/contacts', contacts);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
