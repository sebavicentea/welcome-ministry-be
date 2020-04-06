const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
});

const app = require('./app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});