import * as appData from '../../data/app.js'

module.exports = function(router) {
  router.get('/app/users', (req, res) => {
    res.json(appData.users)
  });

  router.get('/app/users/:id', (req, res) => {
    let users = appData.users;

    let selectedUser = users.filter((user) => user.id == req.params.id)
    res.send(selectedUser[0]);
  })

  router.post('/app/users/:id', (req, res) => {
    let users = appData.users;
    appData.users = users.map((user) => {
      if(user.id == req.params.id) {
        user = { ...user, ...req.body }
      }
      return user;
    });

    res.send(appData)
  })
}
