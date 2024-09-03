const express = require("express");
const productController = require("../controller/product.controller.js");
const upload = require("../middleware/upload.js");
const formatProductImageUrls = require("../middleware/imageUrlFormatter.js");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const app = express.Router();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/product/list", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const filters = {
      name: req.query.name,
      ptid: req.query.ptid,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
    };

    const products = await productController.productFindAll(user_id, filters);
    const productsWithImageUrls = formatProductImageUrls(products, req);
    res.status(200).send(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Error fetching products", error });
  }
});



app.post("/api/product/create", upload.single("image"), async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);
    const { name, price, ptid, rating, description } = req.body;

    let imagePath = null;
    if (req.file) {
      // Generate a unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + path.extname(req.file.originalname);
      imagePath = path.join("uploads", filename).replace(/\\/g, "/");

      // Move the file to the uploads directory
      fs.renameSync(req.file.path, path.join(__dirname, "..", imagePath));
      console.log("Image saved at:", imagePath);
    }

    // Create the product with the image path
    const newProduct = await productController.createProduct({
      name,
      price,
      ptid,
      rating,
      description,
      image: imagePath, // Store the relative path to the image
    });

    // Construct the full image URL for the response
    if (newProduct.image) {
      newProduct.image = `${req.protocol}://${req.get("host")}/${
        newProduct.image
      }`;
    }

    res
      .status(200)
      .send({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in product creation:", error);
    res
      .status(500)
      .send({ message: "Internal server error: " + error.message });
  }
});
app.patch(
  "/api/product/update/:pid",
  upload.single("image"),
  async (req, res) => {
    try {
      const { pid } = req.params;
      const { name, price, ptid, rating, description } = req.body;
      let imagePath = null;
      if (req.file) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(req.file.originalname);
        imagePath = path.join("uploads", filename).replace(/\\/g, "/");

        // Move the file to the uploads directory
        fs.renameSync(req.file.path, path.join(__dirname, "..", imagePath));
        console.log("Image saved at:", imagePath);
      }

      // Update the product with the image path
      const updatedProduct = await productController.updateProduct(pid, {
        name,
        price,
        ptid,
        rating,
        description,
        image: imagePath, // Update the image path
      });

      // Construct the full image URL for the response
      if (updatedProduct.image) {
        updatedProduct.image = `${req.protocol}://${req.get("host")}/${
          updatedProduct.image
        }`;
      }

      res.status(200).send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error in product update:", error);
      res
        .status(500)
        .send({ message: "Internal server error: " + error.message });
    }
  }
);
app.get("/api/product/detail/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    let product = await productController.productDetail(pid);
    
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    
    // Process the image URL
    if (product.image) {
      let imagePath;
      if (typeof product.image === "string") {
        imagePath = product.image;
      } else if (product.image.type === "Buffer") {
        imagePath = Buffer.from(product.image.data).toString("utf-8");
      }
      
      if (imagePath) {
        // Replace backslashes with forward slashes
        const normalizedPath = imagePath.replace(/\\/g, "/");
        // Construct the full URL
        product.image = `${req.protocol}://${req.get("host")}/${normalizedPath}`;
      }
    }
    
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = app;
