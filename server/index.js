require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const {SERVER_PORT} = process.env;
const {seed, deleteComment, createComment, getComments} = require('./controller.js');
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

app.use(cors());
app.use(express.json());
app.post('/seed', seed);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/css', express.static('public/stylesheets'));
app.get('/', (req,res) => {
    res.sendFile('/Users/lindatran/Documents/GitHub/capstone/public/home.html');
});


app.get('/comments', getComments)
app.post('/comments', createComment)
app.delete('/comments/:id', deleteComment)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))

