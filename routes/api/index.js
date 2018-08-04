import express from 'express';

import login from './login';
import key from './key';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'Api'
  });
})

router.use('/login', login);
router.use('/key', key);

export default router;
