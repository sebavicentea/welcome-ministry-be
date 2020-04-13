const guestModel = require('../models/guest-model.js');


const guestsService = {
  getGuests,
  getGuestById,
  addNewGuest,
};

function getGuests(user) {
  return new Promise((resolve, reject) => {
    guestModel.getAll(user.church_id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}

function getGuestById(id) {
  return new Promise((resolve, reject) => {
    guestModel.getGuestById(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}

function addNewGuest(data, user) {
  const newGuest = { ...data, churchId: user.church_id };
  return new Promise((resolve, reject) => {
    guestModel.addNewGuest(newGuest).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}


// function updateUser(id,userData,callback) {
//     return new Promise((resolve,reject) => {
//         userModel.updateUser(id,userData).then((data)=>{
//             resolve(data);
//         }).catch((err) => {
//             reject(err);
//         })
//     })

// }

// function deleteUser(id) {
//     return new Promise((resolve,reject) => {
//         userModel.deleteUser(id).then((data)=>{
//             resolve(data);
//         }).catch((err) => {
//             reject(err);
//         })
//     })
// }

// function getAllUser() {
//     return new Promise((resolve,reject) => {
//         userModel.getAllUser().then((data)=>{
//             resolve(data);
//         }).catch((err) => {
//             reject(err);
//         })
//     });
// }

// function getUserById(id) {
//     return new Promise((resolve,reject) => {
//         userModel.getUserById(id).then((data)=>{
//             resolve(data);
//         }).catch((err) => {
//             reject(err);
//         })
//     });
// }


module.exports = guestsService;
