const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3200;
app.use(bodyParser.json());

module.exports = { app, PORT, bodyParser };
