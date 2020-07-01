const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit : 100,
  host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

function connectionCheck() {
    return new Promise((resolve,reject) => {
      
      connection.getConnection(function(err, connection) {
               if(err) {
                   if(connection) connection.release();
                 reject(err)
              } else  {
                resolve('success')
              }
          })
      })
  }

function connectionRelease() {
    connection.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });
}

function parseDate(date) {
  const newDate= new Date(date);
  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
}

module.exports = {
    connection: connection,
    connectionCheck:connectionCheck(),
    connectionRelease:connectionRelease(),
    parseDate: parseDate
}