import * as appData from '../../data/app.js'
import fs from 'fs';

module.exports = function(router) {

  router.get('/key', (req, res) => {
    const private1 = fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_1/id_rsa', 'utf-8')
    const public1 = fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_1/id_rsa.pub', 'utf-8')
    const private2 = fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_2/id_rsa', 'utf-8')
    const public2 = fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_2/id_rsa.pub', 'utf-8')

    res.json({
      '1': {
        publicKey: public1,
        privateKey: private1
      },
      '2': {
        publicKey: public2,
        privateKey: private2
      }
    })
  })
}
