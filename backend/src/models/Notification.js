import mongoose from 'mongoose';
const schema = new mongoose.Schema({ recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, type: { type: String, required: true }, title: { type: String, required: true }, body: String, link: String, readAt: Date }, { timestamps: true });
export default mongoose.model('Notification', schema);
