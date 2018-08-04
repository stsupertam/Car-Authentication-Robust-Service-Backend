import crypto from 'crypto'
import fs from 'fs'

router.get('/key', (req, res) => {
  const private1 = fs.readFileSync('../../key/user-1/id_rsa', 'utf-8')
  const public1 = fs.readFileSync('../../key/user-1/id_rsa.pub', 'utf-8')
  const private2 = fs.readFileSync('../../key/user-2/id_rsa', 'utf-8')
  const public2 = fs.readFileSync('../../key/user-2/id_rsa.pub', 'utf-8')

  return res.json({
    '1': {
      publicKey: public1,
      privateKey: private1
    },
    '2': {
      publicKey: public2,
      privateKey: private2
    }
  })
});