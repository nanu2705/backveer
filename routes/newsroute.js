import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import News from "../models/News.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle the form data
app.post('/news', async (req, res) => {
  const { adtype, language, mobileno, content } = req.body;

  console.log(adtype); // Log the data sent in the request body

  try {
    // Save the news in the database
    const news = await News.create({
      adtype,   
      language,
      mobileno,
      content,
    });

    console.log(news);
    res.json({ success: true, message: 'Thanks, data saved successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error occurred' });
  }
});

// GET route to fetch the news
app.get('/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json({ news });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(`Error fetching data: ${error.message}`);
    }
});

// DELETE route to delete news by ID
app.delete('/news/:id', async (req, res) => {
    try {
        const deletedData = await News.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({ success: false, error: "Details not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }   
});

export default app;
