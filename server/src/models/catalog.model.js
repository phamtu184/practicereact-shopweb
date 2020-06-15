const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catalogSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;
