const { EntitySchema } = require("typeorm");

const Empleados = new EntitySchema({
  name: "Empleados",
  tableName: "empleados",
  columns: {
    id: {
      type: "integer",
      primary: true,
      generated: false,
    },
    nombre_completo: {
      type: "varchar",
      nullable: false,
    },
    documento: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      nullable: false,
    },
    id_area: {
      type: "integer",
      nullable: true,
    },
    id_cargo: {
      type: "integer",
      nullable: true,
    },
    sueldo_bruto: {
      type: "real",
      nullable: true,
    },
    sueldo_neto: {
      type: "real",
      nullable: true,
    },
    status: {
      type: "varchar",
      nullable: true,
    },
    admin: {
      type: "boolean",
      nullable: true
    },
  },
  relations: {
    area: {
      target: "Areas", // Ajusta el nombre de la entidad "Areas" según tu configuración
      type: "many-to-one",
      joinColumn: {
        name: "id_area",
        referencedColumnName: "id",
      },
    },
    cargo: {
      target: "Cargos", // Ajusta el nombre de la entidad "Cargos" según tu configuración
      type: "many-to-one",
      joinColumn: {
        name: "id_cargo",
        referencedColumnName: "id",
      },
    },
  },
});

module.exports = Empleados;