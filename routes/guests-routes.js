  
const express = require('express');
const router = express.Router();
const guestsController = require('../controllers/guests-controller');
// const authController = require('./../controllers/authController');

// // Protect all routes after this middleware
// router.use(authController.protect);

// router.delete('/deleteMe', userController.deleteMe);

// Only admin have permission to access for the below APIs 
// router.use(authController.restrictTo('admin'));

// router
//     .route('/')
//     .get(guestsController.getGuests);




module.exports = router;