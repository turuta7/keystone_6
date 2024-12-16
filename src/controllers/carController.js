const { PrismaClient } = require("@prisma/client");

// Инициализация Prisma Client
const prisma = new PrismaClient();

class Cars {
  // Получить все автомобили
  static async getAllCars(req, res) {
    try {
      const cars = await prisma.car.findMany(); // Получаем все автомобили
      res.status(200).json(cars); // Отправляем успешный ответ с автомобилями
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ message: "Error fetching cars" });
    }
  }

  // Получить один автомобиль по id
  static async getCarById(req, res) {
    try {
      const { id } = req.params; // Получаем id из параметров запроса
      const car = await prisma.car.findUnique({
        where: { id }, // Ищем по id
      });

      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      res.status(200).json(car); // Отправляем найденный автомобиль
    } catch (error) {
      console.error("Error fetching car:", error);
      res.status(500).json({ message: "Error fetching car" });
    }
  }

  // Создать новый автомобиль
  static async createCar(req, res) {
    try {
      const data = req.body; // Получаем данные из тела запроса
      const newCar = await prisma.car.create({
        data, // Данные для нового автомобиля
      });

      res.status(201).json(newCar); // Отправляем успешный ответ с новым автомобилем
    } catch (error) {
      console.error("Error creating car:", error);
      res.status(500).json({ message: "Error creating car" });
    }
  }

  // Обновить информацию о автомобиле
  static async updateCar(req, res) {
    try {
      const { id } = req.params; // Получаем id из параметров запроса
      const data = req.body; // Получаем новые данные из тела запроса
      const updatedCar = await prisma.car.update({
        where: { id }, // Поиск по id
        data, // Новые данные
      });

      res.status(200).json(updatedCar); // Отправляем обновленный автомобиль
    } catch (error) {
      console.error("Error updating car:", error);
      res.status(500).json({ message: "Error updating car" });
    }
  }

  // Удалить автомобиль по id
  static async deleteCar(req, res) {
    try {
      const { id } = req.params; // Получаем id из параметров запроса
      const deletedCar = await prisma.car.delete({
        where: { id }, // Поиск по id
      });

      res.status(200).json(deletedCar); // Отправляем удаленный автомобиль
    } catch (error) {
      console.error("Error deleting car:", error);
      res.status(500).json({ message: "Error deleting car" });
    }
  }
}

module.exports = Cars;
