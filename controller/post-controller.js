const db = require("../connection");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");

const { models, posts } = db;

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
    next(e);
  }
};

exports.createPost = async (req, res) => {
  let transaction;

  try {
    transaction = await db.transaction();
    const newPost = await models.posts.create(
      {
        title: faker.random.words(faker.datatype.number({ min: 3, max: 5 })),
        userId: 10,
        summary: faker.random.words(
          faker.datatype.number({ min: 30, max: 40 })
        ),
        tags: [{ name: faker.random.word() }, { name: faker.random.word() }],
      },
      { include: [models.tags], transaction: models.user }
    );

    const post = await models.posts.findByPk(newPost.id, {
      include: [
        { model: models.tags, through: { attributes: [] } },
        { model: models.users, attributes: ["id", "username"] },
      ],
      transaction,
    });

    await transaction.commit();

    return res.json({ ...post.toJSON() });
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
    }
    if (e.name === "SequelizeValidationError")
      res.status(400).json({
        errors: e?.errors?.map((e) => ({ message: e.message, path: e.path })),
      });
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
