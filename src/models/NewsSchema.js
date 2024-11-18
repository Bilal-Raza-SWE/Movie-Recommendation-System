const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const NewsSchema = new mongoose.Schema({
  newsId: { type: Number, unique: true }, // Auto-incrementing ID
  title: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  relatedMovies: { type: [Number], ref: "Movie", default: [] }, // Array of movie IDs
});

NewsSchema.plugin(AutoIncrement, { inc_field: "newsId" });

module.exports = mongoose.model("News", NewsSchema);
