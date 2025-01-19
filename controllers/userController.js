const User = require("../databaseModel/userModel.js");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Read all user records
const getAllUser = async (req, res) => {
  try {
    let filter = {};

    const users = await User.find(filter);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to register a new user
const registerUser = async (req, res) => {
  const { userName, password, firstName, lastName, email } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists in your database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in Auth0
    const auth0Domain = process.env.AUTH0_DOMAIN;
    const auth0Token = process.env.AUTH0_MANAGEMENT_API_TOKEN;

    const auth0Response = await axios.post(
      `https://${auth0Domain}/api/v2/users`,
      {
        connection: "Username-Password-Authentication", // Use your connection name
        email: email,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${auth0Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // If Auth0 registration succeeds, create the user in your MongoDB database
    const newUser = new User({
      userName, // Keep this for your database, but don't send it to Auth0
      password: hashedPassword,
      firstName,
      lastName,
      email,
      auth0Id: auth0Response.data.user_id, // Save the Auth0 user ID for reference
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
      auth0Id: newUser.auth0Id,
    });
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
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

    const userInfo = {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    // Generate a JWT token
    const token = jwt.sign(
      { id: User._id, userName: User.userName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      userName: user.userName,
      ...userInfo,
    });
  } catch (error) {
    console.error("Sorry, password or username is invalid.", error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};
module.exports = {
  userAuth,
  registerUser,
  getAllUser,
};
