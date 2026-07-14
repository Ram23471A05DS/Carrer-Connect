import mongoose from 'mongoose';
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true }, student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resume: { url: String, publicId: String }, coverLetter: { type: String, maxlength: 5000 }, status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected', 'withdrawn'], default: 'pending', index: true },
}, { timestamps: true });
applicationSchema.index({ job: 1, student: 1 }, { unique: true });
export default mongoose.model('Application', applicationSchema);
