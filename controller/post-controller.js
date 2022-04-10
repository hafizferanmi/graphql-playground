const db = require("../connection");
const _ = require("lodash");

const { models } = db;

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await models.posts.findAll({
      where: {
        published: true,
      },
      include: [
        { model: models.comments, limit: 2 },
        {
          model: models.tags,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: models.users, attributes: ["id", "username"] },
      ],

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
      include: [
        { model: models.users },
        { model: models.tags, through: { attributes: [] } },
        { model: models.comments, limit: 1, attributes: ["id", "body"] },
      ],
    });
    res.json({ post });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};
