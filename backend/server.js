require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
// logger middleware
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.body, req.time);
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

// User model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    settings: {
      theme: {
        theme: { type: String, default: "Dark" },
        /* add more settings here */
      },
    },
  })
);

// Check if password is acceptable
const check_password = async (username, password) => {
  if (password.toLowerCase().includes(username.toLowerCase())) {
    return { passed: false, msg: "Password may not contain the username" };
  }
  if (password.length < 6) {
    return { passed: false, msg: "Password must be over 6 characters" };
  }
  if (password.length > 127) {
    return {
      passed: false,
      msg: "Password should not be over 127 characters. You shouldn't be securing anything that sensitive on this website anyway.",
    };
  }

  return { passed: true, msg: "Success!" };
};

// Authentication middleware function
function authenticateToken(req, res, next) {
  var token = null;
  try {
    token = req.headers["authorization"].split(" ")[1]; // Get token from 'Authorization' header
  } catch {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    // Verify the token using the secret key
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request object
    //console.log(`correct token by ${req.user}`);
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).send({ error: "Invalid or expired token." });
    console.log(err);
    return;
  }
}

// Register route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await check_password(email, password);
  if (!result.passed) {
    res.status(400).send({ message: result.msg });
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: email,
      password: hashedPassword,
      salt: salt,
    });
    console.log("waiting for user.");
    await newUser.save();
    console.log("registered user.");
    res.status(201).send({ message: "User registered!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Registration failed" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ username: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).send({ message: "Login successful", token });
    } else {
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({ error: "Login failed" });
    console.log(error);
  }
});

app.get("/settings", authenticateToken, async (req, res) => {
  try {
    // Check for the correct token (handled by authenticateToken middleware)

    // Request MongoDB for settings
    const settings = await User.findOne({ username: req.user.id }); // Assuming you're storing settings by userId
    if (!settings) {
      return res.status(404).send({ message: "Settings not found." });
    }

    // Send the settings in JSON form
    res.status(200).json(settings);
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).send({ message: "Internal server error." });
  }
});

// POST settings
app.post("/settings", authenticateToken, async (req, res) => {
  try {
    // Check for the correct token (handled by authenticateToken middleware)

    // Update MongoDB with settings
    const settings = req.body; // Assuming the settings are sent in the body
    if (!settings) {
      return res.status(400).send({ message: "Settings data is required." });
    }

    const updatedSettings = await User.findOneAndUpdate(
      { username: req.user.id },
      { $set: settings },
      { new: true, upsert: true } // Create a new document if one doesn't exist
    );

    res.status(200).json(updatedSettings);
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).send({ message: "Internal server error." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
