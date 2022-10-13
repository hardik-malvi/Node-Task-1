const express = require('express');
const app = express();
const routes = require('./routes/routes');
const db = require('./db/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' })
const upload = multer({ dest: './tmp/' })
app.use(upload.any());
// Formdata and Jsondata for post
app.use(bodyParser.json()) 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// Routes Define
app.use(routes);
app.all('*', (req, res, next) => {

    res.status(400).json({
        status: 'fail',
        Message: `can't find ${req.originalUrl} on this server`
    });

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app runnning on port ${port}....`);
});






