import * as casual from 'casual';
import app from './app';

const mongoose = require('mongoose')
const PORT = 4500;

const main = async() => {
  try {
    // connect to mongoDB database
    mongoose.connect('mongodb://localhost:27017/user_cont_db',
    {
      useNewUrlParser: true, useUnifiedTopology: true
    },
    (err, db) => {
      //  if error occurs throw error
       if(err) throw err;
      //  Get initialize users collection 
       const Users = db.collection('users');
      //  initialize order bulk operator
       let bulk = Users.initializeUnorderedBulkOp();

       console.time('time');
       console.log('Start inserting documents')
      //  run a forLoop in 100000 iteration to insert document
       for(let i = 1; i <= 100000; ++i) {
        const doc = {
          email: casual.email,
          name: casual.name,
          age: casual.integer(0, 100),
          birthDate: new Date(casual.date('YYYY-MM-DD')),
          city: casual.city
        };
        // insert document
        bulk.insert(doc);
       }
       bulk.execute(
        () => {
          bulk = Users.initializeUnorderedBulkOp();
        }
      )
      console.log('done inserting documents')
      console.timeEnd('time');
       }
    );

    // If connect is successful console.log this message
    mongoose.connection.once('open', () => {
      console.log('Connected to the database')
    })
    // await init()
    // Express app should listen to designated port
    app.listen(PORT, () => {
      console.log(` User_Dir is running on Port : ${PORT}`);
    });
  } catch (error) {
    //  catch and console.log every errors
    console.error(`${error}`);
  }
};
main();