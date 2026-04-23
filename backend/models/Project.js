const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      default: "Personal Project",
    },
    duration: String,
    role: String,

    // --- NEW: File Upload Structure ---
    thumbnail: {
      type: String,
      required: true,
    }, // Card ke liye main photo

    // Gallery mixed (Images + Videos), limit logic controller me handle karenge
    media: [
      {
        url: {
          type: String,
        }, // File path
        type: {
          type: String,
          enum: ["image", "video"],
        }, // File type identification
      },
    ],

    description: {
      type: String,
      required: true,
    },
    challenge: String,
    solution: String,

    techStack: [String],
    features: [String],
    stats: [{ label: String, value: String }],
    codeSnippet: String,

    github: String,
    live: String, // Agar ye empty hua to UI pe nahi dikhayenge
  },
  { timestamps: true }
);

projectSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);
