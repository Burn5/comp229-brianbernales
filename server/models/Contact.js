const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    email:     { type: String, required: true }
    // You *can* keep extra fields if you really want:
    // message: String,
    // date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
