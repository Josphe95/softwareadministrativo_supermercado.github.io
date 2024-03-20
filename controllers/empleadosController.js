const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Empleados = require("../db/entities/empleados");

async function empleadosController(req, res) {
  try {
    const connection = await connectToDatabase();
    const empleadoRepository = getRepository(Empleados);
    console.log(req.params.id);
    const empleadoId = req.params.id;
    console.log("Empleado ID:", empleadoId);
    const empleadoExistente = await empleadoRepository.findOne(empleadoId);
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

module.exports = { empleadosController };
