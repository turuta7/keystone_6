const { config } = require("@keystone-6/core");
const { lists } = require("./schema");
require("dotenv").config();

const morgan = require("morgan");
const app = require("./server");
const carRoutes = require("./src/routes/carRoutes");

const PORT_KEYSTONE = process.env.PORT_KEYSTONE || 5000;

export default config({
  db: {
    onConnect: () => {
      console.log("Database connected and server is ready!");
      const PORT = process.env.PORT || 3010;
      app.use(morgan("dev")); 
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    },
    provider: "postgresql",
    url:
      process.env.DATABASE_URL ||
      "postgresql://myuser:mypassword@localhost:5432/mydatabase",
  },
  lists,
  server: {
    cors: { origin: ["*"], credentials: true },
    port: PORT_KEYSTONE,
    maxFileSize: 200 * false,
    // Включение логирования
    logger: {
      level: "info", // Уровень логирования (debug, info, warn, error)
      transports: [
        // Вывод в консоль
        new (require("winston").transports.Console)({
          format: require("winston").format.combine(
            require("winston").format.colorize(),
            require("winston").format.simple()
          ),
        }),
      ],
    },

    // extendExpressApp: (app) => {
    //   app.use(morgan("dev")); 
    //   app.use("/api/cars", carRoutes);
    // },
  },
});
