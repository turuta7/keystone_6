const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Импортируем роутеры
const carRoutes = require("./src/routes/carRoutes");

// Используем middleware для парсинга JSON
app.use(bodyParser.json());

// Подключаем маршруты
app.use("/api/cars", carRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Запуск сервера
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const { PrismaClient } = require("@prisma/client");

// // Инициализация Prisma Client
// const prisma = new PrismaClient();

// async function getAllCars() {
//   try {
//     const cars = await prisma.car.findMany(); // Используем Prisma для получения всех автомобилей
//     console.log(cars);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Запуск функции
// getAllCars().catch((err) => console.error(err));
