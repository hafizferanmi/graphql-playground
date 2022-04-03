const { models } = require("../connection");
const _ = require("lodash");

exports.getPosts = async (req, res, next) => {
  try {
    const a = await models.posts.findAll({
      include: { model: models.comments, where: { published: true }, limit: 2 },
      where: {
        id: 6,
      },
    });
    res.json({ success: true, results: a });
  } catch (e) {
    console.log(e);
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await models.create({
      title: "Ade Ori okin",
      userId: 1,
      summary: "Some nice articles coming to your ",
    });

    return res.json({ newPost });
  } catch (e) {
    console.log(e);
  }
};

exports.getPost = async (req, res) => {
  try {
    if (!_.toNumber(req.params.id)) throw new Error("id is required");
    const post = await models.posts.findByPk(req.params.id, {
      include: models.users,
      required: true,
    });
    res.json({ post });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};
