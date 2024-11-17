const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CustomListSchema = new mongoose.Schema({
  listId: { type: Number, unique: true },
  userId: { type: Number, required: true }, // User creating the list
  title: { type: String, required: true },
  movies: { type: [Number], ref: "Movie", default: [] }, // Array of movie IDs
  isPublic: { type: Boolean, default: false }, // Public or private list
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add auto-incrementing list ID
CustomListSchema.plugin(AutoIncrement, { inc_field: "listId" });

module.exports = mongoose.model("CustomList", CustomListSchema);
