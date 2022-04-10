const { models } = require("../connection");
const { generateUsers } = require("../utility");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await models.users.findAll({
      limit: 5,
      include: { model: models.posts, limit: 2 },
    });
    res.json({ success: true, results: users });
  } catch (e) {
    console.log("Error occured");
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await models.users.findAll({
      limit: 5,
      include: { model: models.posts, limit: 2 },
    });
    res.json({ success: true, results: users });
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
