const LibraryModel = require("../../models/library");

exports.createLibrary = async (_, { name, address }, ctx, info) => {
  const library = await LibraryModel.create({ name, address });
  return library;
};
