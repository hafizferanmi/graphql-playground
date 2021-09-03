const { Sequelize } = require("sequelize");
const {
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  DB_HOST,
} = require("./config/default.json");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
};

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();
syncDatabase();

module.exports = sequelize;
