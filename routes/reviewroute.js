
import express from 'express';
import fs from 'fs';

const app = express();


app.post('/reviews', (req, res) => {
    const newReview = req.body; 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading reviews:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        try {
            const reviews = JSON.parse(data);
            reviews.push(newReview); 

            fs.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to reviews file:', writeErr);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.json({ success: true, message: 'Review added successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing reviews:', parseError);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

export default app;