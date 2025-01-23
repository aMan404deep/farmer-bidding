const Listing = require("../models/Listing");
const Bid = require("../models/Bid");
const io = require("../socket"); 

const getBidsForListing = async (req, res) => {
  try {
    const bids = await Bid.find({ listingId: req.params.listingId }).populate("transporterId", "name vehicleDetails");
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptBid = async (req, res) => {
  const { bidId } = req.params;

  try {
    const bid = await Bid.findById(bidId).populate("listingId");
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const listing = await Listing.findById(bid.listingId._id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.farmerId.toString() !== req.user.id)
      return res.status(403).json({ message: "You are not authorized to accept this bid" });

    listing.status = "Closed";
    bid.status = "Accepted";

    await listing.save();
    await bid.save();

    // Notify the transporter
    io.to(`transporter_${bid.transporterId}`).emit("bidAcceptedNotification", { bid });

    res.status(200).json({ message: "Bid accepted", bid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { getBidsForListing, acceptBid };
