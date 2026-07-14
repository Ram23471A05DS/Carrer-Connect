import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student', index: true },
  phone: { type: String, trim: true },
  profileImage: String,
  resume: { url: String, publicId: String, originalName: String },
  headline: String,
  bio: String,
  location: String,
  skills: [{ type: String, trim: true }],
  experience: Number,
  education: [{ institution: String, degree: String, field: String, startDate: Date, endDate: Date }],
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { transform: (_, ret) => { delete ret.password; return ret; } } });
userSchema.pre('save', async function hashPassword(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
userSchema.methods.comparePassword = function comparePassword(password) { return bcrypt.compare(password, this.password); };
export default mongoose.model('User', userSchema);
