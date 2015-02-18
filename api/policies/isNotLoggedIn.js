/**
 * Don't allow an authenticated user.
 */
module.exports = function isNotLoggedIn(req, res, next) {
  // User is allowed, proceed to controller
  var isAuth = req.isAuthenticated();
  if (!isAuth) {
    return next();
  }
  // User is not allowed
  else {
    return res.redirect('/');
  }
};
