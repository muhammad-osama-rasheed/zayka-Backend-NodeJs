const express = require("express");
const app = express();

const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

require("dotenv").config();
const db = require("./database/db");

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Zayka!");
});

app.listen(port, () => {
  console.log(`Zayka listening on port ${port}`);
});
