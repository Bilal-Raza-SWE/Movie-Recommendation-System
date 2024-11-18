const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const BoxOfficeSchema = new mongoose.Schema({
  boxOfficeId: { type: Number, unique: true }, // Auto-incrementing ID
  movieId: { type: Number, ref: "Movie", required: true }, // Associated movie
  totalEarnings: { type: Number, required: true }, // Total box office earnings
  openingWeekend: { type: Number }, // Opening weekend earnings
  currency: { type: String, default: "USD" }, // Currency for earnings
  lastUpdated: { type: Date, default: Date.now },
});

BoxOfficeSchema.plugin(AutoIncrement, { inc_field: "boxOfficeId" });

module.exports = mongoose.model("BoxOffice", BoxOfficeSchema);
