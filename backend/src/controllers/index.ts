import { Request, Response } from 'express';
import { Users } from '../models/user';
import { pagination } from './paginate';

interface IRequest {
  limit: number,
  page: number
}

// Controller that fetch users
const fetchUsers = async (req: Request<unknown, unknown, unknown, IRequest>, res: Response) => {
  try {
    let {
      limit,
      page,
    } = req.query;
    limit = Number(limit) || 10;
    page = Number(page) || 1;

    // format to paginate data
    const paginate = {
      page: page === 1 ? 0 : page - 1 || 1,
      limit: limit || 10
    };

    // Find user
    const getUsers = await Users.find().lean().limit(paginate.limit)
    .skip(paginate.page * paginate.limit);

    // Get total user count
    const getUsersCount = await Users.countDocuments();

    // if no user is found return an empty array
    if (getUsers.length === 0) {
      return res.status(200).json({
        message: 'Users is yet to be created',
        data: []
      });
    }

    // return pagination meta data
    const meta = pagination(getUsersCount, limit, page)

    // return payload
    return res.status(200).json({
      message: 'Successfully retrieved users',
      data: getUsers,
      meta
    })
  } catch(error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default fetchUsers;