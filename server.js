const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Force Google and Cloudflare DNS

const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const mongodb = require('./models/contacts-data');
const cors = require('cors');
app.use(cors());




app.use(express.urlencoded({ extended: true }));


app.use('/', require('./routes/contacts'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);}
    else {
        
        console.log('Database initialized successfully');}
    

    });
        

 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});