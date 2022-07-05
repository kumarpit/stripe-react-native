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

app.post('/payment-sheet', async (req, res) => {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2020-08-27'}
    )
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'cad',
        customer: customer.id,
        payment_method_types: ["card"]
    })

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.PUBLISHABLE_KEY,
    })
})