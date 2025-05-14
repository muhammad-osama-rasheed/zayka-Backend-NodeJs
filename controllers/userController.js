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

module.exports = { getUsers, deleteUser };

// const createProduct = async (req, res) => {
//   try {
//     const data = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const uploadImageToCloudinary = cloudinary.uploader.upload(req.file.path, {
//       folder: "uploads",
//       use_filename: true,
//       unique_filename: true,
//     });

//     if (uploadImageToCloudinary) {
//       data.image = uploadImageToCloudinary.secure_url;
//     }

//     const newProduct = new Product(data);
//     const savedProduct = await newProduct.save();

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully.",
//       data: savedProduct,
//     });
//   } catch (error) {
//     console.log("Error Saving: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error.",
//       error: error,
//     });
//   }
// };
