import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.cyan("Conexión a la BD exitosa!"));
  } catch (error) {
    console.log(colors.red(error));
    console.log(colors.red("Hubo un error al conectar con la BD"));
  }
}
connectDB();

// Express instance
const server = express();
// Read form data
server.use(express.json());

server.use("/api/v1/products", router);

export default server;
