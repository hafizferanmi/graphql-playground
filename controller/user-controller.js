const { models } = require("../connection");
const { generateUsers } = require("../utility");

exports.getUsers = async (req, res, next) => {
  try {
    const a = await models.users.findAll();
    res.json({ success: true, results: a });
  } catch (e) {
    console.log("Error occured");
  }
};

exports.createUser = async (req, res) => {
  try {
    const users = generateUsers();
    console.log(users, "u");
    const newUser = await models.users.bulkCreate(users);

    return res.json({ newUser });
  } catch (e) {
    console.log(e);
  }
};
