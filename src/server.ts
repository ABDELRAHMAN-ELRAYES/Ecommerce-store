import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DB = process.env.DATABASE;
mongoose.connect(<string>DB).then(() => {
  console.log("Database connected successfully!.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[Server] is listening at port ${port}`);
});
