// Basic placeholder authentication middleware
function protect(req, res, next) {
  // In a real app, you would check for a valid token or session here
  next();
}

module.exports = { protect }; 