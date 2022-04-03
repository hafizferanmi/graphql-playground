const models = require("./models");
const syncDatabase = async () => {
  await models.sequelize.sync({ alter: true });
};

const checkConnection = async () => {
  try {
    await models.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();
// syncDatabase();

module.exports = models.sequelize;
