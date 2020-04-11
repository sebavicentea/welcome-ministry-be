const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit : 100,
  host: 'localhost',
    user: 'root',
    password: 'fgsvmdlf07MySQL!',
    database: 'welcome_ministry'
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

module.exports = {
    connection: connection,
    connectionCheck:connectionCheck(),
    connectionRelease:connectionRelease()   
}