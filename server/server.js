const express = require("express");
const cors = require("cors");
const passport = require('passport');
const fetch = require("node-fetch");

const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


// passport.use('tink', new OAuth2Strategy({
//         authorizationURL: 'https://link.tink.com/1.0/authorize/?test=true',
//         tokenURL: 'https://api.tink.com/api/v1/oauth/token',
//         clientID: process.env.REACT_APP_CLIENT_ID,
//         clientSecret: process.env.REACT_APP_CLIENT_SECRET,
//         callbackURL: 'http://localhost:5000/auth/tink/callback'
//     },
//     function (accessToken, refreshToken, profile, done) {
//
//     }));

// app.get('/auth/tink',
//     passport.authenticate('tink', {scope: 'accounts:read'})
// );
// app.get('/auth/tink/callback', passport.authenticate('tink', {
//     successRedirect: 'localhost:3000/',
//     failureRedirect: 'localhost:3000/login'
// }));

const baseUrl = 'https://api.tink.com/api/v1';

app.post('/auth/token', async (req, res) => {
    if (req.body.code) {
        const code = req.body.code;
        const response = await fetch(baseUrl + '/oauth/token', {
            method: "post",
            headers: {
                "ContentType":"application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                code: code,
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                grant_type: "authorization_code"
            })
        });

        const message = await response.json();

        if((response.status !== 200 && response.status !== 201)) {
            console.error(`Invalid Response ${response.status}`);
            console.log(response);
            console.log(message);
            return res.status(501);
        }
        console.log(message);
        return res.status(200).send(message);
    }
    return res.status(301).json({"error": 'No code'});
});

app.post('/accounts', async (req, res) => {
    if (req.body.access_token) {
        const response = await fetch(baseUrl + '/accounts/list', {
            method:'get',
            headers: {
                'Authorization': 'Bearer ' + req.body.access_token,
            }
        });
        const message = await response.json();
        console.log(message);
        return res.send(message);
    }
    console.log('account failed');
    return res.status(301).json({"error": 'No access_token'});

});

// Must contain full data under body
app.post('/transactions', async (req, res) => {
    if (req.body.access_token) {
        console.log(JSON.stringify(req.body.data));
        const response = await fetch(baseUrl + '/search', {
            method:'post',
            headers: {
                'Authorization': 'Bearer ' + req.body.access_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body.data)
        });
        const message = await response.json();
        console.log(message);
        return res.send(message);
    }
    console.log('account failed');
    return res.status(301).json({"error": 'No access_token'});

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});