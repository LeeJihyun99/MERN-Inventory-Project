import express from "express";
import { Product } from "../models/productModel.js";

const productsRouter = express.Router();

// get all the products
productsRouter.get("/", async (request, response) => {
  try {
    const products = await Product.find({});
    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get for one product with id from database
productsRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);
    return response.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update a product
productsRouter.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.category || !request.body.price) {
      return response
        .status(400)
        .send({ message: "Send all required fields: title, category, price" });
    }

    const { id } = request.params;
    const result = await Product.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(400).send({ message: "Product not found" });
    }

    return response
      .status(200)
      .send({ message: "Product updated successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete a product
productsRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return response.status(400).json({ message: "product not found" });
    }

    return response
      .status(200)
      .send({ message: "product deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// create new product and load it into mongodb
productsRouter.post("/", async (request, response) => {
  try {
    if (!request.body.title || !request.body.category || !request.body.price) {
      return response.status(400).send({
        message: "Send all required fields: title, category, ",
      });
    }
    const newProduct = {
      title: request.body.title,
      category: request.body.category,
      price: request.body.price,
    };

    const product = await Product.create(newProduct);

    return response.status(201).send(product);
  } catch (error) {
    console.log(error.message);
  }
});

export default productsRouter;
