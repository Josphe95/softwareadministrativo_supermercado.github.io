const express = require("express");
const { empleadosController } = require("../controllers/empleadosController");
const router = express.Router();

router.delete("/:id", empleadosController); 

module.exports = router;
