//Express
const express = require('express');
const app = express();

//Import
const appRoutes = require('./routes/app-routes');
const mongoose = require('mongoose');
require("dotenv").config();

//Ejs
app.set('view engine', 'ejs');

//Port
const port = 3000;

//DB
const db = process.env.SECRET_DATA_BASE;

//Fun for run to server and connecting to MongoDB
const Run = () => {
    try {
        app.listen(port, (error) => {
            error ? console.log(error) : console.log(`Listening port : ${port}`);
        });
        mongoose
            .connect(db)
            .then(() => console.log('Connected to MongoDB'))
            .catch((error) => console.log(error));
    } catch (e) {
        console.log(e);
    }
}
Run();

//Middleware and routes
app.use(express.urlencoded());

app.use(appRoutes);

app.use((req, res) => {
    res.send('Error');
});
