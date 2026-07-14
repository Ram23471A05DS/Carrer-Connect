import mongoose from 'mongoose';
const schema = new mongoose.Schema({ company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true }, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, rating: { type: Number, required: true, min: 1, max: 5 }, title: String, body: { type: String, required: true, maxlength: 3000 } }, { timestamps: true });
schema.index({ company: 1, author: 1 }, { unique: true }); export default mongoose.model('Review', schema);
