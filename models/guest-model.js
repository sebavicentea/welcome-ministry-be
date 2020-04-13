const db = require('../utils/db');

exports.getAll = async () => {
    return new Promise((resolve,reject) => {
        db.connection.query(`CALL GetChurchGuests(1)`,(error,rows,fields)=>{
            if(!!error) {
                db.connectionRelease;
                reject(error);
            } else {
                db.connectionRelease;
                resolve(rows[0]);
            }
       });
    });
};

exports.getGuestById = async(id) => {
    return new Promise((resolve,reject) => {
        db.connection.query(`CALL GetGuestById(${id})`,(error,rows,fields)=>{
            if(!!error) {
                db.connectionRelease;
                reject(error);
            } else {
                db.connectionRelease;
                resolve(rows[0]);
            }
       });
    });
}

exports.addNewGuest = async(data) => {
 
    return new Promise((resolve,reject) => {
        db.connection.query(`CALL AddNewGuest(
            "${data.name}",
            "${data.lastname}",
            ${data.age},
            "${data.phoneNumber}",
            "${data.visitDate}",
            ${data.churchId}
            )`,(error,rows,fields)=>{
            if(!!error) {
                db.connectionRelease;
                reject(error);
            } else {
                db.connectionRelease;
                resolve(rows[0]);
            }
       });
    });
}