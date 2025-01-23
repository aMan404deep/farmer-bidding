const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Farmer = require("../models/Farmer");
const Transporter = require("../models/Transporter");

const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "farmer") {
      user = new Farmer({ name, email, password: hashedPassword, phone });
    } else if (role === "transporter") {
      user = new Transporter({ name, email, password: hashedPassword, phone });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === "farmer") {
      user = await Farmer.findOne({ email });
    } else if (role === "transporter") {
      user = await Transporter.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
