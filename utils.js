const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const createError = (statusCode, message) =>
  createHttpError(statusCode, { message });

const notFound = (message = "Not found") =>
  createError(StatusCodes.NOT_FOUND, message);

const notAllowed = (message = "Request forbidden") =>
  createError(StatusCodes.FORBIDDEN, message);

const notAuthorized = (message = "Not authorized") =>
  createError(StatusCodes.UNAUTHORIZED, message);

const invalidData = (message = "Invalid Data") =>
  createError(StatusCodes.BAD_REQUEST, message);

const serverError = (message = "Error occured, we working on it") =>
  createError(StatusCodes.INTERNAL_SERVER_ERROR, message);

module.exports = {
  createError,
  notFound,
  notAllowed,
  notAuthorized,
  invalidData,
  serverError,
};
