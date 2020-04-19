function isLoggedIn (req, res, next) {
    console.log("Checkin if it's logged")
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
    console.log('Not logged in')
	// if they aren't redirect them to the home page
	sendNoAuthorized(res);
}

function sendNoAuthorized(res) {
    res.status(401).send(notAuthorized);
}

const notAuthorized = {    
    message: 'You must login'  
  }

module.exports = {
    isLoggedIn: isLoggedIn
}