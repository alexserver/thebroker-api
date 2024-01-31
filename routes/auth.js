const API_KEY = process.env.API_KEY;

export const authMiddleware = (req, res, next) => {
  const { access_key } = req.query;
  if (access_key !== API_KEY) {
    // request is not authorized
    return res.status(401).send({
      error: {
        code: "invalid_key",
        message: "Invalid API KEY, you're not authorized",
      },
    });
  } else {
    return next();
  }
};
