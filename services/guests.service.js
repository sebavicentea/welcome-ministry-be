var guestModel = require("../models/guest-model.js");


var guestsService = {
    getGuests: getGuests,
    getGuestById: getGuestById,
    addNewGuest: addNewGuest
}

function getGuests() {
    return new Promise((resolve,reject) => {
        guestModel.getAll().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function getGuestById(id) {
    return new Promise((resolve,reject) => {
        guestModel.getGuestById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function addNewGuest(data) {
    const id= 1;

    data.churchId= id;
    console.log(data)
    return new Promise((resolve,reject) => {
        guestModel.addNewGuest(data).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    }) 
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