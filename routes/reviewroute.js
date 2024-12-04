import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();


app.use(express.json());

const filePath = path.join(__dirname, 'reviews.json');


app.post('/reviews', (req, res) => {
  const { name, initialName, review, rating } = req.body;

 
  if (!name || !initialName || !review || !rating) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  
  const newReview = {
    name,
    initialName,
    review,
    rating,
    date: new Date().toISOString(),
  };

  // Read the existing reviews from the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reviews:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      // Parse the file content and add the new review
      const reviews = JSON.parse(data || '[]');
      reviews.push(newReview);

      // Write the updated reviews back to the file
      fs.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to reviews file:', writeErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Send success response
        return res.json({ success: true, message: 'Review added successfully', review: newReview });
      });
    } catch (parseError) {
      console.error('Error parsing reviews:', parseError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

export default app;
