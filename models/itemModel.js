const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;

