import mongoose from 'mongoose';
const companySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true, index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  description: { type: String, maxlength: 5000 }, website: String, industry: String, size: String,
  location: String, logo: { url: String, publicId: String }, isApproved: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model('Company', companySchema);
