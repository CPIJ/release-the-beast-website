require('dotenv').config();
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/config', (req, res) => {
    res.send({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        facebookAppId: process.env.FACEBOOK_APP_ID
    });
});

app.listen(3000, () => console.log("Server started at http://localhost:3000"))