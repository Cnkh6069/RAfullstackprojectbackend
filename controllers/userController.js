const User = require("../databaseModel/userModel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserAcct = async (req, res) => {
  const { name, email, userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Function to authenticate user.
const userAuth = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: User._id, userName: User.userName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};

module.exports = {
  createUserAcct,
  userAuth,
};
//delete User
