const LibraryModel = require("../../models/library");

exports.libraries = async (_, input, ctx, info) => {
  const libraries = await LibraryModel.findAll();
  return libraries;
};
