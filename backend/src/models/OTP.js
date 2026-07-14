import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, codeHash: { type: String, required: true }, purpose: { type: String, enum: ['email-verification', 'password-reset'], required: true }, expiresAt: { type: Date, required: true, index: { expires: 0 } } }, { timestamps: true });
schema.index({ user: 1, purpose: 1 });
export default mongoose.model('OTP', schema);
