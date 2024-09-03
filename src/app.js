
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes/user');

const app = express();

mongoose.connect('mongodb+srv://dba:sarah123@usuarios.613rm.mongodb.net/?retryWrites=true&w=majority&appName=Usuarios')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
});