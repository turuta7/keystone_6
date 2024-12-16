const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// Получить все автомобили
router.get("/", carController.getAllCars);

// Получить один автомобиль по id
router.get("/:id", carController.getCarById);

// Создать новый автомобиль
router.post("/", carController.createCar);

// Обновить информацию о автомобиле
router.put("/:id", carController.updateCar);

// Удалить автомобиль
router.delete("/:id", carController.deleteCar);

module.exports = router;
