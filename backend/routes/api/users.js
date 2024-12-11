
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/auth');


const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ status: 'error', msg: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', msg: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save user to database
        const savedUser = await newUser.save();

        // Generate token
        const token = jwt.sign({ id: savedUser.id }, config.get('jwtsecret'), {
            expiresIn: config.get('tokenExpire'),
        });

        res.status(201).json({
            status: 'ok',
            msg: 'Successfully registered',
            token,
            user: {
                id: savedUser.id,
                username: savedUser.username,
                email: savedUser.email,
            },
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ status: 'error', msg: 'Internal server error' });
    }
});


// Login Backend


// Login user
router.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
      return res.status(400).json({ status: 'error', msg: 'Please provide email and password' });
  }

  try {
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ status: 'error', msg: 'User not found' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ status: 'error', msg: 'Incorrect password' });
      }

      // Generate token
      const token = jwt.sign({ id: user.id }, config.get('jwtsecret'), {
          expiresIn: config.get('tokenExpire'),
      });

      res.status(200).json({
          status: 'ok',
          msg: 'Login successful',
          token,
          user: {
              id: user.id,
              username: user.username,
              email: user.email,
          },
      });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});


// A protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ status: 'ok', msg: 'Access granted', user: req.user });
});


// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Find the user by ID from the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return user details except password
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

//update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { username, email, password } = req.body;

  // Build user object
  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, salt);
  }

  try {
    // Find user by ID from the JWT
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    );

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


//lister les utlisateurs

//tp pour le classe
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/*
//pour classe
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});
//pour classe
router.put("/:id", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Build user object
  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, salt);
  }
  if (role) userFields.role = role;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//supprimer un utlisateur pour classe
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error,
    });
  }
});*/

module.exports = router;
