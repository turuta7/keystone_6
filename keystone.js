const morgan = require("morgan");
require("dotenv").config();

const { config } = require("@keystone-6/core");
const { lists } = require("./schema");

const app = require("./server");

const PORT_KEYSTONE = process.env.PORT_KEYSTONE || 5000;
const PORT = process.env.PORT_SERVER || 3010;
const URL =
  process.env.DATABASE_URL ||
  "postgresql://myuser:mypassword@localhost:5432/mydatabase";

export default config({
  db: {
    onConnect: () => {
      console.log("***Database connected and server is ready!***");
      // app.use(morgan("dev"));
      app.listen(PORT, () => {
        console.log(`***Server is running on port ${PORT}***`);
      });
    },
    provider: "postgresql",
    url: URL,
  },
  lists,
  server: {
    cors: { origin: ["*"], credentials: true },
    port: PORT_KEYSTONE,
    maxFileSize: 200 * false,
    // Enable logging
    logger: {
      level: "info",
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

    extendExpressApp: (app) => {
      app.use(morgan("dev"));
      // app.use("/api/cars", require("./src/routes/carRoutes"));
    },
  },
});
