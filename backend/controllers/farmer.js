const { getIO } = require("../socket");
const Listing = require("../models/Listing");

const createListing = async (req, res) => {
  const { farmerId,goodsType, quantity,pickupLocation,destination,deadline,price } = req.body;

  try {
    const listing = new Listing({
      goodsType,
      quantity,
      pickupLocation,
      destination,
      deadline,
      price,
      farmerId: farmerId || req.user.id,
    });

    await listing.save();

    const io = getIO();
    io.emit("newListing", listing);
    // io.emit("newListing", listing);

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createListing };
