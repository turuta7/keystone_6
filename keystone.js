const { config } = require("@keystone-6/core");
const { lists } = require("./schema");

export default config({
  db: {
    provider: "postgresql",
    url:
      process.env.DATABASE_URL ||
      "postgresql://myuser:mypassword@localhost:5432/mydatabase",
  },
  lists,
});
