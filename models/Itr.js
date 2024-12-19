import mongoose from 'mongoose';

const itrSchema = new mongoose.Schema({
    pancard: {
        type: String,
        required: true,
    },
    incomeSource: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }

});

const Itr = mongoose.model('Itr', itrSchema);

export default Itr;
