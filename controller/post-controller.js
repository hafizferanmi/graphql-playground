const db = require("../connection");
const { Op } = require("sequelize");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");
const { notAllowed } = require("../utils");

const {
  posts: PostModel,
  tags: TagsModel,
  comments: CommentModel,
  users: UsersModel,
} = db.models;

exports.getPosts = async (req, res, next) => {
  const tagsIn = [10, 1];
  const { page = 1, resultsPerPage = 100, types = ["settlement"] } = req.query;
  try {
    // if ("haruna") return next(createHttpError(StatusCodes.NOT_FOUND));
    // if ("haruna") throw createHttpError(StatusCodes.UNAUTHORIZED);
    // if ("haruna") return next(notAllowed("This reqest no fit go laelae"));
    console.log("Lets see if the code gets here");
    const posts = await PostModel.scope("withoutDesc").findAll({
      where: {},
      order: [["createdAt", "DESC"]],
      include: [
        { model: CommentModel, limit: 2 },
        {
          model: TagsModel,
          attributes: ["id", "name"],
          where: { id: { [Op.notIn]: tagsIn } },
          through: { attributes: [] },
        },
        {
          model: UsersModel,
          attributes: ["id", "username"],
        },
      ],
      offset: 10,
      limit: 10,
    });
    res.json({ success: true, results: posts });
  } catch (e) {
    // console.log(e);
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
