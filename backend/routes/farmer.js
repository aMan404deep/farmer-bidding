const express = require("express");
const { createListing } = require("../controllers/farmer");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/listings",authenticate,createListing);

module.exports = router;
