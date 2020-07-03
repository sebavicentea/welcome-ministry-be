const guestModel = require("../models/guest-model.js");

const guestsService = {
  getGuests,
  getGuestById,
  addNewGuest,
  editGuest,
};

function getGuests(user,column, order, pageSize, pageNumber) {
  const offset= pageNumber * pageSize;
  return new Promise((resolve, reject) => {
    guestModel
      .getAll(user.church_id, column, order, pageSize, offset)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getGuestById(id) {
  const guestPromise = guestModel.getGuestById(id);
  const prayersPromise = guestModel.getPrayersFromGuest(id);

  return new Promise((resolve, reject) => {
    Promise.all([guestPromise, prayersPromise])
      .then(([guestData, prayerData]) => {
        let message = {};
        if (guestData.length) {
          message = guestData[0];
          message.prayers = prayerData;
        }
        resolve(message);
      })
      .catch((err) => {
        reject(err);
      });
  });
  // return new Promise((resolve, reject) => {
  //   guestModel.getGuestById(id).then((data) => {
  //     const message= data.length ? data[0] : {};
  //     resolve(message);
  //   }).catch((err) => {
  //     reject(err);
  //   });
  // });
}

function addNewGuest(data, user) {
  const newGuest = { ...data, churchId: user.church_id };
  const { prayers } = data;
  return new Promise((resolve, reject) => {
    guestModel
      .addNewGuest(newGuest)
      .then((guestData) => {
        let message = {};
        if (guestData.id) {
          const prayersQuery = prayers.map((prayer) => {
            console.log("Adding ", guestData.id, prayer.description);
            guestModel.addGuestPrayers(guestData.id, prayer.description);
          });

          Promise.all(prayersQuery)
            .then(() => {
              resolve({});
            })
            .catch((reason) => {
              reject("Prayer could not be added:", reason);
            });
        } else {
          reject("The guest could not be added");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function editGuest(guestData) {
  const { prayers } = guestData;

  return new Promise((resolve, reject) => {
    const actualPrayersPromise = guestModel.getPrayersFromGuest(guestData.id);
    const editGuestPromise = guestModel.editGuest(guestData);
    Promise.all([actualPrayersPromise, editGuestPromise])
      .then(([actualPrayers, editGuest]) => {
        const prayers = guestData.prayers;
        let actualPrayersIds = actualPrayers.map((prayer) => prayer.id);

        const prayersQuery = prayers.map((prayer) => {
          const description = prayer.description.trim();
          const prayerId= prayer.prayer_id;
          if (prayerId) {
            //Edit prayer
            console.log("Edit prayer", prayerId, description);
            if (description.length) {
              guestModel.editPrayer(prayerId, description);
              actualPrayersIds = actualPrayersIds.filter(
                (id) =>{ 
                  console.log(id,'',prayerId)
                  return id !== prayerId }
              );
            }
          } else {
            //Add new prayer
            console.log("Add new prayer", description);
            guestModel.addGuestPrayers(guestData.id, description);
          }
        });

        const deletePrayers = actualPrayersIds.map((id) =>
          guestModel.deletePrayer(id)
        );

        Promise.all(prayersQuery, deletePrayers)
          .then(() => {
            resolve({});
          })
          .catch((reason) => {
            reject("Prayer could not be added:", reason);
          });
      })
      .catch((err) => {
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
