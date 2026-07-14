import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: 'text' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  description: { type: String, required: true }, requirements: [{ type: String }], skills: [{ type: String, index: true }],
  location: { type: String, required: true, index: true }, type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'], required: true },
  experience: { min: { type: Number, default: 0 }, max: Number }, salary: { min: Number, max: Number, currency: { type: String, default: 'INR' } },
  status: { type: String, enum: ['open', 'closed', 'draft'], default: 'open', index: true }, deadline: Date,
}, { timestamps: true });
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
export default mongoose.model('Job', jobSchema);
