require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json())

// cors
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to Database'))


// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for the API endpoints',
      },
      servers:[
        {
            url: 'http://localhost:3000/'
        }
      ]
    },
    apis: ['routes/authRoutes.js'],
  };
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const apartmentRoutes = require('./routes/apartmentRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
app.use('/api/auth/', authRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/apartment/', apartmentRoutes)
app.use('/api/payment/', paymentRoutes)


app.listen(3000, ()=> console.log('Server Started'))