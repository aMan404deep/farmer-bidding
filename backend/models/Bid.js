const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
  {
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    transporterId: { type: mongoose.Schema.Types.ObjectId, ref: "Transporter", required: true },
    bidAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['Pending', 'Accepted', 'Rejected'], 
      default: 'Pending' 
    },
  },
  { timestamps: true }  // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Bid", BidSchema);
