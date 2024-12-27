import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Middleware to parse JSON request bodies

// API Endpoint to fetch student visa details
app.get('/api/student-visa', (req, res) => {




  const filePath = path.join(__dirname, '../../visadata.json');

  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const visaData = JSON.parse(data);
   

   
      return res.json(visaData);
   
  });
});




export default app