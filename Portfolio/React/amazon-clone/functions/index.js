const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
// @ts-ignore
const stripe = require("stripe")("sk_test_51IDrlfKan2UWK9lDp7jo1UkOps016O6FczBWiRqeGmTChtTA12F4XjILW9wQk9UvCaeIT4c6voFifgMvAgiZkJMJ002JWFGCh7");

// API

// API Config
const app = express();
// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
// API routes
app.get('/', (request, response) => response.status(200).send("hello world"));
// Listen Command
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    })
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app);
// 结果 Endpoint
// http://localhost:5002/clone-8e77f/us-central1/api
