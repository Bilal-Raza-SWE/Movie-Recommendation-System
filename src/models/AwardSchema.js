const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AwardSchema = new mongoose.Schema({
  awardId: { type: Number, unique: true }, // Auto-incrementing ID
  movieId: { type: Number, ref: "Movie", required: true }, // Associated movie
  title: { type: String, required: true }, // Award title
  year: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Best Picture"
  winner: { type: Boolean, default: false }, // Whether the movie won the award
});

AwardSchema.plugin(AutoIncrement, { inc_field: "awardId" });

module.exports = mongoose.model("Award", AwardSchema);
