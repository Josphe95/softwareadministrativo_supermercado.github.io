const app = require('express')();
const cors = require('cors');
const swaggerUiExpress = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const { createConnection } = require("typeorm");
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");

// Habilitar CORS para todos los orígenes
app.use(cors());


const EmpleadosRoute = require("./routes/registroEmpleadosRoutes");
const loginRoutes = require("./routes/loginRoutes");
const AreasRoutes = require("./routes/areasRegistroRoutes");
const registroEmpleado = require("./routes/registroEmpleadosRoutes");
const rutasDelete = require("./routes/rutasDELETE");

// Configuracion bodyParser
app.use(bodyParser.json());
// Agrega swagger a la aplicación
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

// Ruta para manejar la solicitud a la raíz de la aplicación
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la página principal!");
});

app.use("/registro", registroEmpleado)
app.use("/iniciar-sesion", loginRoutes)
app.use("/empleados", EmpleadosRoute);
app.use("/areas", AreasRoutes);


//-------------------------------------------

const { getRepository } = require("typeorm");
const Empleados = require("./db/entities/empleados");

async function empleadosController(req, res) {
  try {
    const connection = await connectToDatabase();
    const empleadoRepository = getRepository(Empleados);
    console.log(req.params.id);
    const empleadoId = req.params.id;
    console.log("Empleado ID:", empleadoId);
    const empleadoExistente = await empleadoRepository.findOne({
      where: { id: empleadoId }
    });
    

    console.log(empleadoExistente);

    if (!empleadoExistente) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    
    await empleadoRepository.delete(empleadoId);

    res.status(200).json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ error: "Hubo un error al eliminar al empleado" });
  }
}

//----------------------------------------------
app.use("/empleados/:id", empleadosController);

// Inicia la aplicación en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});

module.exports = app;
