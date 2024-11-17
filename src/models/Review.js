const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ReviewSchema = new mongoose.Schema({
  reviewId: { type: Number, unique: true },
  movieId: { type: Number, required: true }, // Changed to Number
  userId: { type: Number, required: true }, // Changed to Number
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String }, // Optional for standalone ratings
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add auto-incrementing ID
ReviewSchema.plugin(AutoIncrement, { inc_field: "reviewId" });

module.exports = mongoose.model("Review", ReviewSchema);
