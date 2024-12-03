import express from "express";
import path from "path";
import cors from "cors";
import bodyParser  from "body-parser";
import Detail from "../models/Detail.js";
import multer from "multer";
import fs from "fs";


const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  
  const upload = multer({ storage:storage })

  
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(bodyParser.json());

app.post('/details',upload.fields([{ name: 'photo' }, { name: 'passfront' }, { name: 'passback' }]),
async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { sname, cname, date, email, mobileNo, quantity } = req.body;
    const photo = req.files.photo[0];
    const passfront = req.files.passfront[0];
    const passback= req.files.passback[0]; 

    try {
      
        // Save detail in the Detail collection
        const detail = await Detail.create({
           sname,
           cname,
            date,
            quantity,
            email, 
            mobileNo,
            photo: {
                filename: photo.filename,
                path: `/uploads/${photo.filename}`, // Store relative path
                size: photo.size,
              },
              passfront: {
                filename: passfront.filename,
                path: `/uploads/${passfront.filename}`, // Store relative path
                size: passfront.size,
              },
              passback: {
                filename: passback.filename,
                path: `/uploads/${passback.filename}`, // Store relative path
                size: passback.size,
              },
          
      
        })
        console.log(detail)
     
        res.json({ success: true, message: 'Thanks Data saved successfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({success: false, error:'Internal server error occurred'});
    }
});

app.get('/details', async (req, res) => {
    try {
        const details = await Detail.find();
        res.json({ details });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(`Error fetching data: ${error.message}`);
    }
});


app.delete('/details/:id', async (req, res) => {
    try {
        const deletedData = await Detail.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({ success: false, error: "details not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }   
});

export default app