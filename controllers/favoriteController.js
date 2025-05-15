const User = require("../models/user");

const toggleFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

    const index = user.favorites.indexOf(productId);

    if (index === -1) {
      user.favorites.push(productId);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Product added to favorites." });
    } else {
      user.favorites.splice(index, 1);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Product removed from favorites." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getFavoriteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("favorites");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Intrnal Server Error" });
  }
};

module.exports = { toggleFavorite, getFavoriteProducts };
