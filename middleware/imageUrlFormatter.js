// utils/imageUrlFormatter.js
module.exports = function formatProductImageUrls(products, req) {
    return products.map((product) => {
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
      return product;
    });
  };
  