const swaggerAutogen = require('swagger-autogen')();

// 1. Create a "smart switch" variable
const isProduction = process.env.NODE_ENV === 'production';

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts',
    },
    // 2. Use the switch to choose the right URL and scheme!
    host: isProduction ? 'cse-3410-project-1.onrender.com' : 'localhost:3000',
    schemes: isProduction ? ['https', 'http'] : ['http'],
}; 

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Make sure this points to your actual routes file

swaggerAutogen(outputFile, endpointsFiles, doc);