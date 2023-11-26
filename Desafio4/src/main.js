import express from "express";
import { apiRouter } from "./routers/api.router.js";
import { webRouter } from "./routers/web.router.js";
import handlebars from "express-handlebars";

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine("handlebars", handlebars.engine());
// Directorio donde se encuentran las vistas
app.set("views", "./views");

// Configuración de archivos estáticos 
app.use("/static", express.static("./static"));

// Middleware para procesar datos JSON en las solicitudes
app.use(express.json());
// Middleware para procesar datos de formularios en las solicitudes
app.use(express.urlencoded({ extended: true }));

// Rutas para la API
app.use("/api", apiRouter);
// Rutas para webRouter
app.use("/", webRouter);

// Middleware para manejar solicitudes no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Middleware para manejar errores internos del servidor (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Hubo un error en el servidor");
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () =>
  console.log(
    "Ingresa en http://localhost:8080"
  )
);