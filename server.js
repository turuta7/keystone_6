const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Импортируем роутеры
const carRoutes = require("./src/routes/carRoutes");

// Используем middleware для парсинга JSON
app.use(bodyParser.json());
app.use(morgan("dev"));
// Подключаем маршруты
app.use("/api/cars", carRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Запуск сервера
// const PORT = process.env.PORT || 3010;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports = app

