import * as casual from 'casual';
import app from './app';
import { init } from './helper';
import { Users } from './models/user'

const mongoose = require('mongoose')
const PORT = 4500;

mongoose.connect('mongodb://localhost:27017/user_dir_db', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// If connect is successful console.log this message
mongoose.connection.once('open', () => {
  try {
    console.log('Connected to the database')
  var bulk = Users.collection.initializeOrderedBulkOp();
  const batchSize = 1000;
  // let i;
  console.time('time')
  for (let i = 1; i <= 100000; i++) {
    const doc = {
      email: casual.email,
      name: casual.name,
      age: casual.integer(0, 100),
      birthDate: new Date(casual.date('YYYY-MM-DD')),
      city: casual.city
    };
    bulk.insert(doc);
    // console.log('inserting in to db 1')
    if (i % batchSize == 0) {
      bulk.execute();
      console.log('i got here 1')
    }
  }
  console.log('i got here 2')
  bulk.execute();
  console.timeEnd('time');
  console.log('i got here 3')

  // Express app should listen to designated port
  app.listen(PORT, () => {
    console.log(` User_Dir is running on Port : ${PORT}`);
  });
  } catch (err) {
    console.error(`${err}`);
  }
})

// const main = async () => {
//   try {
//     // connect to mongoDB database
//     mongoose.connect('mongodb://localhost:27017/user_dir_db', {
//       useNewUrlParser: true, useUnifiedTopology: true
//     });

//     // If connect is successful console.log this message
//     mongoose.connection.once('open', () => {
//       console.log('Connected to the database')
//     })

//     // Express app should listen to designated port
//     app.listen(PORT, () => {
//       console.log(` User_Dir is running on Port : ${PORT}`);
//     });

//     // Run the function that populates the db
//     await init();
//   } catch (error) {
//     //  catch and console.log every errors
//     console.error(`${error}`);
//   }
// };
// main();