const dotenv = require('dotenv');

dotenv.config({
    path: './config/config.env'
});
const db = require('./utils/db')


// ((err) => {
//   if (err) throw err;
//   console.log('DB Connected!');
// });

db.connectionCheck.then((data) =>{
  //console.log(data);
}).catch((err) => {
   console.log(err);
});



const app = require('./app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});