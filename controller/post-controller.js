const db = require("../connection");
const _ = require("lodash");

const { models } = db;

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await models.posts.findAll({
      include: { model: models.comments, where: { published: true }, limit: 2 },
      include: { model: models.tags, as: "tags" },
      include: { model: models.users },
      where: {
        published: true,
      },
      offset: 10,
      limit: 5,
    });
    res.json({ success: true, results: posts });
  } catch (e) {
    console.log(e);
  }
};

exports.createPost = async (req, res) => {
  let transaction;

  try {
    transaction = await db.transaction();
    const newPost = await models.posts.create(
      {
        title: "A newly created post",
        userId: 10,
        summary: "Some nice articles coming to your ",
        tags: [{ name: "haruna" }, { name: "isa" }],
      },
      { include: [models.tags], transaction }
    );

    const post = await models.posts.findByPk(newPost.id, {
      include: { model: models.tags, through: { attributes: [] } },
      include: { model: models.users },
      transaction,
    });

    await transaction.commit();

    return res.json({ ...post.toJSON() });
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(e);
  }
};

exports.getPost = async (req, res) => {
  try {
    if (!_.toNumber(req.params.id)) throw new Error("id is required");
    const post = await models.posts.findByPk(req.params.id, {
      include: models.users,
      include: { model: models.tags, through: { attributes: [] } },
      require: true,
    });

    const user = await post.getUser();
    res.json({ post, user });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};
