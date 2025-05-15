const joi = require("joi");

const signUpValidator = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(2).max(70).required(),
    email: joi.string().email().required(),
    role: joi.string().valid("manager", "admin", "user").default("user"),
    password: joi.string().min(6).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, error: error });
  }
  next();
};

const loginValidator = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }
  next();
};

module.exports = { signUpValidator, loginValidator };

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
