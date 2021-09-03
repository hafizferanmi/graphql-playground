const connection = require("../connection");
const AuthorsModel = require("../models/authors");
const BooksModel = require("../models/books");
const LibraryModel = require("../models/library");

const books = async (_, input, ctx, info) => {
  const books = await BooksModel.findAll();
  return books;
};

const createBook = async (_, { authorId, title }, ctx, info) => {
  const book = await BooksModel.create({ title, authorId });
  return book;
};

const libraries = async (_, input, ctx, info) => {
  const libraries = await LibraryModel.findAll();
  return libraries;
};

const createLibrary = async (_, { name, address }, ctx, info) => {
  const library = await LibraryModel.create({ name, address });
  return library;
};

const authors = async (_, input, ctx, info) => {
  const authors = await AuthorsModel.findAll();
  return authors;
};

const createAuthor = async (_, { name }, ctx, info) => {
  const author = await AuthorsModel.create({ name });
  return author;
};

const resolvers = {
  Query: {
    books,
    authors,
    libraries,
  },
  Mutation: {
    createAuthor,
    createBook,
    createLibrary,
  },
  Book: {
    author: async ({ authorId }, input) => {
      const author = await AuthorsModel.findByPk(authorId);
      return author;
    },
    library: async ({ libraryId }) => {
      const library = await LibraryModel.findByPk(libraryId);
      return library;
    },
  },
  Library: {
    books: async ({ id }) => {
      const books = await BooksModel.findAll({ where: { libraryId: id } });
      return books;
    },
  },
  Author: {
    books: async ({ id }) => {
      const books = await BooksModel.findAll({ where: { authorId: id } });
      return books;
    },
  },
};

module.exports = resolvers;
