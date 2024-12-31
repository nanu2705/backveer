
import express from 'express';
import Review from '../models/Review.js';

const app = express();


app.post('/reviews', async(req, res) => {

        try {
            const {name, initialName, review, rating } = req.body;
    
            const reviewData = await Review.create({ name, initialName, review, rating });
    
            console.log(reviewData)
            res.json({ success: true, message: 'Thanks for your inquiry' });
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
   
        res.json({ reviews});
   
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.delete('/reviews/:id', async (req, res) => {
    try {
        const deletedData = await Review.findByIdAndDelete(req.params.id);
        console.log(deletedData);
        if (!deletedData) {
            return res.status(404).json({ success: false, error: "review not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

export default app;