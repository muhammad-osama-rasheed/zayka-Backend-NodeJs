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

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("favorites");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { getUsers, deleteUser, getSingleUser };
