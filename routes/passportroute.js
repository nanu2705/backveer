import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import Passport from "../models/Passport.js";
const app = express();


app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.post('/passport', upload.fields([{ name: 'file' }, { name: 'file1' }, { name: 'file2' }, { name: 'file3' }]), 
async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Extract file information from req.files
    const file1 = req.files.file[0];
    const file2 = req.files.file1[0];
    const file3 = req.files.file2[0];
    const file4 = req.files.file3[0];

    // Create a new passport entry
    const passport = await Passport.create({
      file1: {
        filename: file1.filename,
        path: `/uploads/${file1.filename}`, // Store relative path
        size: file1.size,
      },
      file2: {
        filename: file2.filename,
        path: `/uploads/${file2.filename}`,
        size: file2.size,
      },
      file3: {
        filename: file3.filename,
        path: `/uploads/${file3.filename}`,
        size: file3.size,
      },
      file4: {
        filename: file4.filename,
        path: `/uploads/${file4.filename}`,
        size: file4.size,
      },
    });
    

    console.log("Document uploaded successfully:", passport);

    res.json({ success: true, message: 'Thanks Document uploaded successfully.' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ success: false, error: 'Internal server error occurred.' });
  }
});


app.get('/passport', async (req, res) => {
  try {
      const passport = await Passport.find();
      res.json({ passport })
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send(`Error fetching data: ${error.message}`);
  }
});

app.delete('/passport/:id', async (req, res) => {
  try {
      const deletedData = await Passport.findByIdAndDelete(req.params.id);

      if (!deletedData) {
          return res.status(404).json({ success: false, error: "details not found" });
      }
      res.json({ success: true, message: "Data Deleted successfully" })
  } catch (error) {
      res.status(500).json({ success: false, error: error.message })
  }   
});


export default app