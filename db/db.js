const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' })
// Database Connection
mongoose.connect(process.env.CLOUD_DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>
    // console.log(con.connections);
    console.log('DB Connection Successfuly')
);