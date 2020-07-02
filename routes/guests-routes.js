const express = require('express');

const router = express.Router();
const guestsService = require('../services/guests.service');
// const authController = require('./../controllers/authController');
// // Protect all routes after this middleware router.use(authController.protect)

// router.delete('/deleteMe', userController.deleteMe)

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo('admin'))

router
  .route('/guests')
  .get(getGuests)
  .post(addNewGuest);

router
  .route('/guests/:id')
  .get(getGuestById)
  .put(editGuest);


function getGuests(req, res) {
  const { user } = req;
  guestsService.getGuests(user).then((data) => {
    res.send(data);
  }).catch((err) => {
    // mail.mail(err);
    res.send(err);
  });
}

function getGuestById(req, res) {
  const guestId = req.params.id;
  // var json_format = iValidator.json_schema(schema.getSchema,userId,"user");
  // if (json_format.valid == false) {
  //   return res.status(422).send(json_format.errorMessage);
  // }

  guestsService.getGuestById(guestId).then((data) => {
    res.send(data);
  }).catch((err) => {
    // mail.mail(err);
    res.send(err);
  });
}

function addNewGuest(req, res) {
  const guestData = req.body;
  const { user } = req;
  // //Validating the input entity
  //  var json_format = iValidator.json_schema(schema.postSchema, userData, "user");
  //  if (json_format.valid == false) {
  //    return res.status(422).send(json_format.errorMessage);
  //  }

  guestsService.addNewGuest(guestData, user).then((data) => {
    res.json(data);
  }).catch((err) => {
    //   mail.mail(err);
    res.status(500).json(err);
  });
}

function editGuest(req, res) {
  const guestData = req.body;
  const { user } = req;
  guestData.id = req.params.id;
  // //Validating the input entity
  //  var json_format = iValidator.json_schema(schema.postSchema, userData, "user");
  //  if (json_format.valid == false) {
  //    return res.status(422).send(json_format.errorMessage);
  //  }

  guestsService.editGuest(guestData).then((data) => {
    res.json(data);
  }).catch((err) => {
    //   mail.mail(err);
    res.status(500).json(err);
  });
}

module.exports = router;
