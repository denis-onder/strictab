require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || "development",
  database: {
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "strictab"
  }
};
