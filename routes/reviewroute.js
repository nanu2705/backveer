import express from 'express';
import Review from '../models/Review.js';

const app = express();

app.post('/reviewform', async (req, res) => {
    try {
        const { name,email,review,rating} = req.body;

        const reviewData = await Review.create({name,email,review,rating});

        console.log(reviewData)
        res.json({ success: true, message: 'Thanks for your inquiry' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});
export default app;