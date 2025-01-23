const { getIO } = require("../socket"); // Import the initialized socket instance
const Bid = require("../models/Bid");
const Listing = require("../models/Listing"); // Import the Listing model to check if the listing exists

const placeBid = async (req, res) => {
  const { listingId, bidAmount } = req.body;

  // Ensure required fields are provided
  if (!listingId || !bidAmount) {
    return res.status(400).json({ message: "Listing ID and bid amount are required" });
  }

  try {
    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const bid = new Bid({
      listingId,
      transporterId: req.user.id,
      bidAmount,
    });

    await bid.save();
    
    const io = getIO();
    // Notify the farmer about the new bid via socket
    io.to(`listing_${listingId}`).emit("bidReceived", { bid });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeBid };
