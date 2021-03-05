import app from './app';
import { init } from './helper';

const mongoose = require('mongoose')
const PORT = 4500;

const main = async () => {
  try {
    // connect to mongoDB database
    mongoose.connect('mongodb://localhost:27017/user_dir_db', {
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

    await init();
  } catch (error) {
    //  catch and console.log every errors
    console.error(`${error}`);
  }
};
main();