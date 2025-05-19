const cloudinary = require("../configurations/cloudinaryConfig");
const Product = require("../models/product");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createProduct = async (req, res) => {
  try {
    const data = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        use_filename: true,
        unique_filename: true,
      },
      async (error, result) => {
        if (error) {
          console.log("Error Uploading Image: ", error);
          return res
            .status(500)
            .json({ success: false, message: "Error uploading image." });
        }

        data.image = result.secure_url;

        const newProduct = new Product(data);
        const savedProduct = await newProduct.save();

        res.status(201).json({
          success: true,
          message: "Product created successfully.",
          data: savedProduct,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.log("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();

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

const searchProduct = async (req, res) => {
  try {
    let search = req.body.search;

    let productData = await Product.find({
      name: { $regex: ".*" + search + ".*", $options: "i" },
    });

    if (productData.length > 0) {
      res.status(200).json({
        success: true,
        message: "Product found successfully",
        data: productData,
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          use_filename: true,
          unique_filename: true,
        },
        async (error, result) => {
          if (error) {
            console.log("Image upload failed: ", error);
            return res
              .status(500)
              .json({ success: false, message: "Image upload failed." });
          }

          updatedData.image = result.secure_url;

          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatedData,
            {
              new: true,
            }
          );

          if (!updatedProduct) {
            return res.status(404).json({
              success: false,
              message: "Product not found.",
            });
          }

          res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: updatedProduct,
          });
        }
      );

      uploadStream.end(req.file.buffer);
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        data: updatedProduct,
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  createProduct,
  upload,
  getAllProducts,
  searchProduct,
  deleteProduct,
  updateProduct,
};
