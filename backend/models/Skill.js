const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String, // Icon ka naam (e.g., "SiReact", "FaPython")
    required: true,
  },
  status: {
    type: String, // Status (e.g., "Expert", "Master")
    required: true,
  },
  color: {
    type: String, // Tailwind text color class (e.g., "text-cyan-400")
    required: true,
  },
  from: {
    type: String, // Tailwind gradient 'from' class (e.g., "from-cyan-400")
    required: true,
  },
  to: {
    type: String, // Tailwind gradient 'to' class (e.g., "to-blue-600")
    required: true,
  },
  owner: {
    type: String, // 'Parth', 'Pal', ya 'Yashvi'
    required: true
  },
}, { timestamps: true });

skillSchema.index({ owner: 1 });

module.exports = mongoose.model('Skill', skillSchema);