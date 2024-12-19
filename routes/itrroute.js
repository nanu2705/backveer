import express from 'express';
import Itr from '../models/Itr.js';

const app = express();

app.post('/itr', async (req, res) => {
    try {
        const { pancard, incomeSource, email, mobile } = req.body;

        const itrData = await Itr.create({ pancard, incomeSource, email, mobile });

        console.log(itrData)
        res.json({ success: true, message: 'Thanks for applying itr' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/itr', async (req, res) => {
    try {
        const itr = await Itr.find();

        res.json({ itr });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.delete('/itr/:id', async (req, res) => {
    try {
        const deletedData = await Itr.findByIdAndDelete(req.params.id);
        console.log(deletedData);
        if (!deletedData) {
            return res.status(404).json({ success: false, error: "itr data not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

export default app;