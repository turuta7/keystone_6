// schema.js
const { list } = require("@keystone-6/core");
const { allowAll } = require("@keystone-6/core/access");
const { text, float, integer, timestamp } = require("@keystone-6/core/fields");

const lists = {
  Product: list({
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
      description: text({ ui: { displayMode: "textarea" } }), // Описание товара
      price: float({ validation: { isRequired: true } }), // Цена товара
      quantity: integer({ validation: { isRequired: true, min: 0 } }), // Количество товара на складе
      createdAt: timestamp({ defaultValue: { kind: "now" } }), // Дата создания товара
    },
  }),

  Car: list({
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
      description: text({ ui: { displayMode: "textarea" } }), // Описание товара
      price: float({ validation: { isRequired: true } }), // Цена товара
      quantity: integer({ validation: { isRequired: true, min: 0 } }), // Количество товара на складе
      createdAt: timestamp({ defaultValue: { kind: "now" } }), // Дата создания товара
    },
  }),
};

module.exports = { lists };
