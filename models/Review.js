import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }

});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
