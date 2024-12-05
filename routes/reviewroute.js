
import express from 'express';
import fs from 'fs';

const app = express();


app.post('/reviews', (req, res) => {

    const { name, initialName, review, rating } = req.body;

       

        console.log(name, initialName, review, rating)
        res.json({ success: true, message: 'Thanks for your inquiry' });


    
});

export default app;