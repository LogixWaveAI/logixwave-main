const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    }, // e.g., "Mobile App Architect"
    desc: {
      type: String,
      required: true,
    }, // Introduction
    image: {
      type: String,
      required: true,
    }, // Photo URL
    resume: {
      type: String,
      required: true,
    }, // Resume Link/Path
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },

    // Design Themes (Admin select karega)
    colorTheme: {
      type: String,
      enum: ["cyan", "purple", "emerald", "red", "yellow"],
      default: "cyan",
    },

    // Order of display
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
