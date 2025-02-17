const { EntitySchema } = require("typeorm");

const Areas = new EntitySchema({
  name: "Areas",
  tableName: "areas",
  columns: {
    id: {
      type: "integer",
      primary: true,
      generated: true,
    },
    descripcion: {
      type: "varchar",
    },
    numero_empleados: {
      type: "varchar",
    },
}
});

module.exports = Areas;