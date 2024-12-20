import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import News from "../models/News.js";
import multer from "multer";
import fs from "fs";

const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
  },
});

const upload = multer({ storage: storage });


const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(bodyParser.json());


app.post('/news', upload.single("document"), async (req, res) => {
  const { adtype, language, mobileNo, content } = req.body;

  
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  const document = req.file; 

  try {
  
    const news = await News.create({
      adtype,   
      language,
      mobileNo,
      content,
      document: {
        filename: document.filename,
        path: `/uploads/${document.filename}`, 
        size: document.size,
      },
    });

    console.log(news);
    res.json({ success: true, message: ' Thanks Data saved successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error occurred' });
  }
});

app.get('/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json({ news });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(`Error fetching data: ${error.message}`);
    }
});

app.delete('/news/:id', async (req, res) => {
    try {
        const deletedData = await News.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({ success: false, error: "details not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }   
});
export default app;
