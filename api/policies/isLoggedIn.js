/**
 * Allow any authenticated user.
 */
module.exports = function isLoggedIn(req, res, next) {
  // User is allowed, proceed to controller
  var isAuth = req.isAuthenticated();
  if (isAuth) {
    return next();
  }
  // User is not allowed
  else {
    req.session.returnTo = req.path;
    return res.redirect('/login');
  }
};
