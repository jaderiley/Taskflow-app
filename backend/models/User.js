import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  emails: [{ type: String, required: true }], // <-- Change from single email to array
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User; // Use ES module export