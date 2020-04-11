const db = require('../utils/db');

exports.getGuestContacts = async (guestID) => {
    return new Promise((resolve,reject) => {
        db.connection.query(`CALL GetGuestContacts(${guestID})`,(error,rows,fields)=>{
            if(!!error) {
                db.connectionRelease;
                console.log('error', error);
                reject(error);
            } else {
                console.log('rows', rows);
                db.connectionRelease;
                resolve(rows[0]);
            }
       });
    });
};

exports.addNewContact = async (data) => {
    return new Promise((resolve,reject) => {
        db.connection.query(`CALL AddNewContact(${guestID})`,(error,rows,fields)=>{
            if(!!error) {
                db.connectionRelease;
                console.log('error', error);
                reject(error);
            } else {
                console.log('rows', rows);
                db.connectionRelease;
                resolve(rows[0]);
            }
       });
    });
};