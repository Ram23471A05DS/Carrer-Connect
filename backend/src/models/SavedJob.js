import mongoose from 'mongoose';
const schema = new mongoose.Schema({ student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true } }, { timestamps: true });
schema.index({ student: 1, job: 1 }, { unique: true });
export default mongoose.model('SavedJob', schema);
