import app from './app';

const mongoose = require('mongoose')
const PORT = 4500;

async function main() {
  try {
    // connect to mongoDB database
    await mongoose.connect('mongodb://localhost:27017/user_dir_db', {
      useNewUrlParser: true, useUnifiedTopology: true
    });
    // If connect is successful console.log this message
    mongoose.connection.once('open', () => {
      console.log('Connected to the database')
    })

    // Express app should listen to designated port
    app.listen(PORT, () => {
      console.log(` User_Dir is running on Port : ${PORT}`);
    });
  } catch (error) {
    //  catch and console.log every errors
    console.error(`${error}`);
  }
} main();