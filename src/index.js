import express from "express";
import cors from "cors";
import router, { create, getData } from "./routes.js";

// Crear una instancia de Express
const app = express();

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Definir rutas
getData();
app.use(router);

// Ruta de creacion
create();

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
