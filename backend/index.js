import mongoose from "mongoose";
import express from "express";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack tutorial");
});

app.use("/products", productsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to mongodb");
    app.listen(PORT, () => {
      console.log(`App is listening to ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
