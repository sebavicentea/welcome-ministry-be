const db = require('../utils/db');

exports.getAll = async (churchId) => new Promise((resolve, reject) => {
  db.connection.query(`CALL GetChurchGuests(${churchId})`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      reject(error);
    } else {
      db.connectionRelease;
      resolve(rows[0]);
    }
  });
});

exports.getGuestById = async (id) => new Promise((resolve, reject) => {
  db.connection.query(`CALL GetGuestById(${id})`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      reject(error);
    } else {
      db.connectionRelease;
      resolve(rows[0]);
    }
  });
});

exports.addNewGuest = async (data) => new Promise((resolve, reject) => {
  const parsedDate = db.parseDate(data.dateOfVisit);
  console.log(parsedDate);
  db.connection.query(`CALL AddNewGuest(
            "${data.name}",
            "${data.lastname}",
            ${data.age},
            "${data.phoneNumber}",
            "${parsedDate}",
            ${data.churchId}
            )`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      reject(error);
    } else {
      db.connectionRelease;
      resolve(rows[0][0]);
    }
  });
});

exports.getPrayersFromGuest= async (id) => new Promise((resolve, reject) => {
  db.connection.query(`CALL GetPrayersFromGuest(${id})`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      reject(error);
    } else {
      db.connectionRelease;
      resolve(rows[0]);
    }
  });
});

exports.addGuestPrayers= async (guestID, description) => new Promise((resolve, reject) => {
  db.connection.query(`CALL AddPrayerToGuest(${guestID}, ${description})`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      reject(error);
    } else {
      db.connectionRelease;
      resolve(rows[0]);
    }
  });
});