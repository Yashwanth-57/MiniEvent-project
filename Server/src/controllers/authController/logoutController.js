// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private (optional)
const logoutUser = async (req, res) => {
  try {
    // For stateless JWT, logout is handled on frontend by removing token
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {  logoutUser };