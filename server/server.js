import express from 'express';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';
import { checkEnv } from './helpers.js';

dotenv.config({ path: '../.env' })

checkEnv();

const app = express();
const stripe = Stripe(process.env.SECRET_KEY, {
    apiVersion: "2020-08-27"
});
const port = 3000;

app.listen(port, () => {
    console.log("Example app listening on http://localhost:3000")
})

app.get('/config', (req, res) => {
    res.json({ publishableKey: process.env.PUBLISHABLE_KEY })
})

app.get('/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'cad'
        });

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret
        })
    } catch(err)  {
        console.error(err.message);
        res.json({ error: err.message });
    }
})