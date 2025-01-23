const express = require("express");
const { getBidsForListing, acceptBid } = require("../controllers/bid");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/:listingId/bids", authenticate, getBidsForListing);
router.post("/accept/:bidId", authenticate, acceptBid);

module.exports = router;
