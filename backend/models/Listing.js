const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
  goodsType: { type: String, required: true },
  quantity: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  destination: { type: String, required: true },
  deadline: { type: Date, required: true },
  price : { type: Date, required: true },
  status: { type: String, default: "Open" }, // Open, Closed, Completed
});

const Listing = new mongoose.model("Listing", ListingSchema);
module.exports = Listing;
