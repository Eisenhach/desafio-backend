import logger from "../repository/logger.repository/logger.js";

export const errors = async (req, res, next) => {
  logger.info(`${req.method} en ${req.url}`);
  logger.warn(`${req.method} en ${req.url}`);
  logger.error(`${req.method} en ${req.url}`);

  try {
    await next();
  } catch (error) {
    logger.error(error);
  }
};
