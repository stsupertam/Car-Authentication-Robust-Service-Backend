import * as appData from '../../data/app.js'
import fs from 'fs';
import crypto from 'crypto';

module.exports = function(router) {

  router.post('/key2', (req, res) => {
    const private_key = fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_2/id_rsa', 'utf-8')
    var message = req.body.message
    const signer = crypto.createSign('sha256');
    signer.update(message);
    signer.end();
    
    const signature = signer.sign(private_key);
    const signature_hex = signature.toString('hex');
    
    return res.json({
      signature: signature_hex
    })
  })
  router.post('/key', (req, res) => {
    const private_key = fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_1/id_rsa', 'utf-8')
    var message = req.body.message
      fs.readFileSync('/home/supertam/Car-Authentication-Robust-Service-Backend/key/user_2/id_rsa.pub', 'utf-8').then(data => {
        message['assignTo'] = data;
        res.json(message)
        const signer = crypto.createSign('sha256');
        signer.update(message);
        signer.end();
        
        const signature = signer.sign(private_key);
        const signature_hex = signature.toString('hex');
        
        res.json({
          signature: signature_hex,
          message: message
        })
      }).catch(err => {
        throw err;
      });
    })

}
