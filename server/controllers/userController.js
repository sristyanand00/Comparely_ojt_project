import User from "../models/User.js";

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

export { registerUser };

// Get user profile (by uid)
export const getUser = async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ success: false, error: "Missing uid" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update user profile (name, phone, avatar)
export const updateProfile = async (req, res) => {
  const { uid, name, phone, avatar } = req.body;
  if (!uid) return res.status(400).json({ success: false, error: "Missing uid" });
  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { $set: { name, phone, avatar } },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- CART ---
export const getCart = async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ success: false, error: "Missing uid" });
  try {
    const user = await User.findOne({ uid }).populate("cart.productId");
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { uid, productId, quantity = 1, platform } = req.body;
  if (!uid || !productId) return res.status(400).json({ success: false, error: "Missing uid or productId" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    // Check if already in cart
    const idx = user.cart.findIndex(item => item.productId.equals(productId) && item.platform === platform);
    if (idx > -1) {
      user.cart[idx].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity, platform });
    }
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { uid, productId, quantity, platform } = req.body;
  if (!uid || !productId) return res.status(400).json({ success: false, error: "Missing uid or productId" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    const idx = user.cart.findIndex(item => item.productId.equals(productId) && item.platform === platform);
    if (idx > -1) {
      user.cart[idx].quantity = quantity;
      if (quantity <= 0) user.cart.splice(idx, 1);
      await user.save();
      res.json({ success: true, cart: user.cart });
    } else {
      res.status(404).json({ success: false, error: "Cart item not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { uid, productId, platform } = req.body;
  if (!uid || !productId) return res.status(400).json({ success: false, error: "Missing uid or productId" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    user.cart = user.cart.filter(item => !(item.productId.equals(productId) && item.platform === platform));
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const clearCart = async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ success: false, error: "Missing uid" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    user.cart = [];
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- ADDRESSES ---
export const getAddresses = async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ success: false, error: "Missing uid" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addAddress = async (req, res) => {
  const { uid, label, details } = req.body;
  if (!uid || !label || !details) return res.status(400).json({ success: false, error: "Missing fields" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    user.addresses.push({ label, details });
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateAddress = async (req, res) => {
  const { uid, index, label, details } = req.body;
  if (!uid || index === undefined || !label || !details) return res.status(400).json({ success: false, error: "Missing fields" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    if (user.addresses[index]) {
      user.addresses[index] = { label, details };
      await user.save();
      res.json({ success: true, addresses: user.addresses });
    } else {
      res.status(404).json({ success: false, error: "Address not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const removeAddress = async (req, res) => {
  const { uid, index } = req.body;
  if (!uid || index === undefined) return res.status(400).json({ success: false, error: "Missing fields" });
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    if (user.addresses[index]) {
      user.addresses.splice(index, 1);
      await user.save();
      res.json({ success: true, addresses: user.addresses });
    } else {
      res.status(404).json({ success: false, error: "Address not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getUser,
  updateProfile,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getAddresses,
  addAddress,
  updateAddress,
  removeAddress,
};