const { EntitySchema } = require("typeorm");

const RegistroSesion = new EntitySchema({
  name: "RegistroSesion",
  tableName: "registro_sesion",
  columns: {
    id: {
      type: "integer",
      primary: true,
      generated: true,
    },
    documento: {
      type: "integer",
      nullable: false,
    },
    contrasena: {
      type: "varchar",
      nullable: false,
    },
    token: {
      type: "varchar",
      nullable: true,
    },
    fecha_hora: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP", // or use another default value
    }
  }
});

module.exports = RegistroSesion;