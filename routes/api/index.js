import express from 'express';

import login from './login';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'Api'
  });
});

router.use('/login', login);

export default router;
