// models/Car.js
const { list } = require("@keystone-6/core");
const { text, float, integer, timestamp } = require("@keystone-6/core/fields");
const { allowAll } = require("@keystone-6/core/access");

const Car = list({
  access: {
    operation: {
      query: () => true, // Разрешить всем пользователям доступ на чтение
      create: allowAll,
      update: allowAll,
      delete: allowAll,
    },
  },
  fields: {
    title: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    description: text({ ui: { displayMode: "textarea" } }), // Описание автомобиля
    price: float({
      validation: { isRequired: true },
      defaultValue: 0, // Значение по умолчанию
    }),
    quantity: integer({ validation: { isRequired: true, min: 0 } }), // Количество автомобилей
    createdAt: timestamp({ defaultValue: { kind: "now" } }), // Дата создания автомобиля
  },
});

module.exports = Car;
