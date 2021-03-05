import { Users } from '../models/user';
import { pagination } from '../helper';

const fetchUsers = async (req, res) => {
  try {
    let {
      limit,
      page,
    } = req.query;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const paginate = {
      page: page === 1 ? 0 : page - 1 || 1,
      limit: limit || 10
    };

    const getUsers = await Users.find().lean().limit(paginate.limit)
    .skip(paginate.page * paginate.limit);

    const getUsersCount = await Users.countDocuments();

    if (getUsers.length === 0) {
      return res.status(200).json({
        message: 'Users is yet to be created',
        data: []
      });
    }

    const meta = pagination(getUsersCount, limit, page)

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