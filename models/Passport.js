import mongoose from "mongoose";

const passportSchema = new mongoose.Schema({
  file1: {
    filename: String,
    path: String,
    size: Number,
  },
  file2: {
    filename: String,
    path: String,
    size: Number,
  },
  file3: {
    filename: String,
    path: String,
    size: Number,
  },
  file4: {
    filename: String,
    path: String,
    size: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

const Passport = mongoose.model('Passport', passportSchema);

export default Passport;
