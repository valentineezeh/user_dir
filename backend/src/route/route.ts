import * as express from 'express';
import fetchUsers from '../controllers';

const router = express.Router();

// concat /api this to all the api
router.get('/api/users', fetchUsers);

export default router;