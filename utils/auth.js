function isLoggedIn (req, res, next) {
    console.log("Checkin if it's logged")
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.send(notAuthorized);
}

const notAuthorized = {
    code: 'E_NOT_AUTHORIZED',
    message: 'Not authorized',
    status: 401
  }

module.exports = {
    isLoggedIn: isLoggedIn
}