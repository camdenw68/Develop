const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
      // If the user is not logged in, redirect to the login page
      return res.redirect('/login');
  } else {
      // If the user is logged in, proceed to the next middleware
      return next();
  }
};

module.exports = withAuth;
