import mongoose from 'mongoose';
const schema = new mongoose.Schema({ sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, body: { type: String, required: true, maxlength: 5000 }, readAt: Date }, { timestamps: true });
schema.index({ sender: 1, recipient: 1, createdAt: -1 }); export default mongoose.model('Message', schema);
