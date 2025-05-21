const User = require("../models/User");

const registerUser = async (req, res) => {
  console.log('Received registration request:', req.body);
  
  const { uid, name, email } = req.body;

  if (!uid || !name || !email) {
    console.error('Missing required fields');
    return res.status(400).json({ 
      success: false,
      error: 'Missing required fields (uid, name, email)' 
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ uid }, { email }] });

    if (existingUser) {
      console.error('User already exists:', existingUser);
      return res.status(409).json({
        success: false,
        error: 'User already exists',
        existingUser
      });
    }

    const newUser = new User({ 
      uid, 
      name, 
      email,
      createdAt: new Date()
    });

    await newUser.save();
    
    console.log('✅ User saved to MongoDB:', newUser);

    return res.status(201).json({ 
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        uid: newUser.uid,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    console.error('❌ Error saving user:', err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: err.message
      });
    }

    return res.status(500).json({ 
      success: false,
      error: 'Failed to register user',
      details: err.message
    });
  }
};

module.exports = {
  registerUser,
};