import express from 'express';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';
import { checkEnv } from './helpers.js';
import cors from 'cors'
import mongoose from 'mongoose';
import User from './models/user.model.js';
import Product from './models/product.model.js';

dotenv.config({ path: '../.env' })

checkEnv();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.SECRET_KEY, {
    apiVersion: "2020-08-27"
});
const port = 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection sucessfully established")
})

app.listen(port, () => {
    console.log("Example app listening on http://localhost:3000")
})

app.get('/config', (req, res) => {
    res.json({ publishableKey: process.env.PUBLISHABLE_KEY })
})

app.get('/customer', async (req, res) => {
    res.json(await stripe.customers.create());
})

app.post('/payment-sheet', async (req, res) => {
    const { customerId, productsId } = req.body;
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customerId},
        {apiVersion: '2020-08-27'}
    )

    let metadata = {}
    productsId.map((id, index) => {
        metadata[`${index}`] = id;
    })

    console.log(metadata);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'inr',
        customer: customerId,
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: metadata
    })

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        publishableKey: process.env.PUBLISHABLE_KEY,
    })
})

app.post('/signup', async (req, res) => {
    try {
        const { username, password, customerId } = req.body;
        const newUser = new User({
            username: username,
            password: password,
            customerId: customerId
        })
        const data = await newUser.save();

        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
        console.warn(err);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json("Invalid request");
        const user = await User.findOne({ username: username });

        if (!user) return res.status(400).json("User doesn't exist");
        if (password != user.password) return res.status(400).json("Invalid username or password");

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json(err);
    }
})

app.post('/product', async (req, res) => {
    try {
        const { name, price } = req.body
        const newProduct = new Product({
            name: name,
            price: price
        })
        const data = await newProduct.save();
        res.status(200).json(data);

    } catch (err) {
        
        res.status(500).json(err);
        console.warn(err);
    }
})

app.get('/products', async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
        console.warn(err);
    }
}) 