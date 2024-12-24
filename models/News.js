import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    adtype: {
        type: String,
       
    },
    language: {
        type: String,
        
    },
    mobileno: {
        type: String,
        
    },
    content:{
        type:String,
        
    },
    // document: {
    //     filename: String,
    //     path: String,
    //     size: Number,
    // },
    createdAt: { type: Date, default: Date.now }

});

const News = mongoose.model('News', newsSchema);

export default News;
