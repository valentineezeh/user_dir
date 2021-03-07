import * as casual from 'casual';
import { Users } from './models/user';

// This function handles the functionality thats populate the DB with 100000 users
const populateDBWithDummyData = (numberOfItems) => {
  const docs = [...new Array(numberOfItems)].map(_ => ({
    email: casual.email,
    name: casual.name,
    age: casual.integer(0, 100),
    birthDate: new Date(casual.date('YYYY-MM-DD')),
    city: casual.city
  }))

  return Users.insertMany(docs, { ordered: false })
}

// 
export const init = async() => {
  // check for table count
  const userCount = await Users.countDocuments();

  // if user table is empty add data to the table
  if (userCount === 0) {
    const numberOfItems = 100000;
    console.log(`adding ${numberOfItems} users to the database`);

    console.time('time')
    await populateDBWithDummyData(numberOfItems);

    console.log(`Finished populating DB with ${numberOfItems} users`);
    console.timeEnd('time');

  } else {

    console.log('cleaning up the db');
    await Users.collection.drop();
    console.log('DB cleared');
  }

}

// This function handles pagination
export const pagination = (count, limit, page) => {
  const numberOfPages = Math.ceil(count / limit);
    const nextPage = parseInt(page, 10) + 1;
    const meta = {
      page: page,
      limit,
      previousPage: (page > 1) ? parseInt(page, 10) - 1 : false,
      nextPage: (numberOfPages >= nextPage) ? nextPage : false,
      pageCount: numberOfPages,
      total: count
    };
    return meta;
}

// mongoose.connection.on("open", function (err) {
//   if (err) throw err;  
//   var bulkUpdateOps = MyModel.collection.initializeUnorderedBulkOp(), 
//       counter = 0;

//   MyModel.find({}).lean().exec(function (err, docs) {
//       if (err) throw err; 

//       docs.forEach(function (doc){
//           // computations
//           var c1, c2, c3, c4, Field8;
//           c1 = 10 + (0.03*doc.Field3);
//           c2 = (doc.Field2 == 1) ? 1: 0.03;
//           c3 = 7 - (doc.Field5.match(new RegExp(".", "g")) || []).length;
//           c4 = (doc.Field2 == 1) ? Math.pow(doc.Field, -0.6) : 1;
//           Field8 = c1*c2*c3*c4;

//           counter++;

//           bulkUpdateOps.find({ "_id": doc._id }).updateOne({
//               "$set": { "Field8": Field8 }
//           });

//           if (counter % 500 == 0 ) {
//               bulkUpdateOps.execute(function(err, result) {
//                   if (err) throw err;  
//                   bulkUpdateOps = MyModel.collection.initializeUnorderedBulkOp();
//                   console.log(result);
//               });
//           } 

//       });     

//       if (counter % 500 != 0 ) {            
//           bulkUpdateOps.execute(function(err, result) {
//               if (err) throw err;  
//               console.log(result);
//           });         
//       }       
//   });

//   var app = express();
//   app.listen(3000, function () {
//       console.log('now listening on http://localhost:3000');
//   });
// });
