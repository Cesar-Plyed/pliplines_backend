import express from "express";
import { createApp } from "./routes.js";

// Configurar la app y arrancar el servidor
const app = createApp();

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
