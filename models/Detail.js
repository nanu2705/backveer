import mongoose from 'mongoose';

const detailSchema = new mongoose.Schema({
    sname:{
        type:String,
    },
    cname:{
        type:String,
    },
    date: {
        type: String,
       
    },
   email: {
        type: String,
    
    },
    mobileNo: {
        type: String,
       
    },
    quantity: {
        type: String,
       
    },
    photo:{
        filename: String,
        path: String,
        size: Number,
    },
    passfront:{
        filename: String,
        path: String,
        size: Number,
    },
    passback:{
        filename: String,
        path: String,
        size: Number,
    },
   
    createdAt: { type: Date, default: Date.now }

});

const Detail = mongoose.model('details', detailSchema);

export default Detail;
