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

  return Users.insertMany(docs)
}

// 
export const init = async() => {
  console.log('cleaning up the db');

  const userCount = await Users.countDocuments();

  console.log('userCount', userCount)

  if (userCount === 0) {
    const numberOfItems = 100000;
    console.log(`adding ${numberOfItems} users to the database`);

    console.time('time')
    await populateDBWithDummyData(numberOfItems);

    console.log(`Finished populating DB with ${numberOfItems} users`);
    console.timeEnd('time');

  } else {
    // await Users.deleteMany({});
    console.log('DB cleared');
  }

}

export const pagination = (count, limit, page) => {
  const numberOfPages = Math.ceil(count / limit);
    // const mainPage = page + 1;
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