const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: [String], required: true }, // Example: ["Action", "Thriller"]
    director: { type: String, required: true },
    cast: { type: [String], required: true }, // Example: ["Actor 1", "Actor 2"]
    releaseDate: { type: Date, required: true },
    runtime: { type: Number, required: true }, // Runtime in minutes
    synopsis: { type: String, required: true },
    averageRating: { type: Number, default: 0 }, // Calculated from user reviews
    coverPhoto: { type: String }, // URL to the movie cover photo
    trivia: { type: [String], default: [] }, // Example: ["Trivia 1", "Trivia 2"]
    goofs: { type: [String], default: [] }, // Example: ["Goof 1", "Goof 2"]
    soundtrack: { type: [String], default: [] }, // Example: ["Soundtrack 1", "Soundtrack 2"]
    parentalGuidance: { type: String }, // Example: "PG-13"
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
