const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const data = await User.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error fecthing: ", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { getUsers };
