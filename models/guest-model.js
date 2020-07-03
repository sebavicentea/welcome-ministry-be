const db = require('../utils/db');

exports.getAll = async (churchId, column, order, pageSize, offset) => new Promise((resolve, reject) => {
  db.connection.query(`CALL GetChurchGuests(${churchId},'${column}',${order},${pageSize},${offset})`, (error, rows, fields) => {
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
  console.log(`CALL AddPrayerToGuest(${guestID}, ${description})`)
  db.connection.query(`CALL AddPrayerToGuest(${guestID}, '${description}')`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      console.log('Errors', error)
      reject(error);
    } else {
      db.connectionRelease;
      console.log('Not errors', rows)
      resolve(rows[0]);
    }
  });
});

exports.editGuest = async (data) => new Promise((resolve, reject) => {
  const parsedDate = db.parseDate(data.dateOfVisit);
  console.log(parsedDate);
  db.connection.query(`CALL EditGuest(
            "${data.id}",
            "${data.name}",
            "${data.lastname}",
            ${data.age},
            "${data.phoneNumber}",
            "${parsedDate}"
            )`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      reject(error);
    } else {
      db.connectionRelease;
      resolve(rows[0]);
    }
  });
});

exports.editPrayer= async (prayerId, description) => new Promise((resolve, reject) => {
  console.log(`CALL AddPrayerToGuest(${prayerId}, ${description})`)
  db.connection.query(`CALL EditPrayer(${prayerId}, '${description}')`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      console.log('Errors', error)
      reject(error);
    } else {
      db.connectionRelease;
      console.log('Not errors', rows)
      resolve(rows[0]);
    }
  });
});

exports.deletePrayer= async (prayerId,) => new Promise((resolve, reject) => {
  console.log(`CALL DeletePrayer(${prayerId})`)
  db.connection.query(`CALL DeletePrayer(${prayerId})`, (error, rows, fields) => {
    if (error) {
      db.connectionRelease;
      console.log('Errors', error)
      reject(error);
    } else {
      db.connectionRelease;
      console.log('Not errors', rows)
      resolve(rows[0]);
    }
  });
});