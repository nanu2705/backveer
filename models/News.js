import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    adtype: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    content:{
        type:String,
        required:true,
    },
    document: {
        filename: String,
        path: String,
        size: Number,
    },
    createdAt: { type: Date, default: Date.now }

});

const News = mongoose.model('News', newsSchema);

export default News;
