const mongoose = require("mongoose");

const TransporterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleDetails: { type: String },
});

module.exports = mongoose.model("Transporter", TransporterSchema);
