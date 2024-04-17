const { validatetoken } = require("../services/auth");

function checkforauthentication(cookiename) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookiename];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validatetoken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}

module.exports = {
    checkforauthentication,
};