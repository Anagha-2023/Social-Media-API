import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
