import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    "app": "This is app endpoint"
  });
})

require('./app')(router);
require('./key')(router);
require('./car')(router);

export default router;
