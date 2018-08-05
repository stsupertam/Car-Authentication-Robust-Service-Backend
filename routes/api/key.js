import * as appData from '../../data/app.js'
import fs from 'fs';
import crypto from 'crypto';

const pathname = '/Users/UnnamE/Desktop/Car-Authentication-Robust-Service-Backend'
module.exports = function (router) {

  router.post('/key2', (req, res) => {
    const private_key = fs.readFileSync(`${pathname}/key/user_2/id_rsa`, 'utf-8')
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
    const private_key = fs.readFileSync(`${pathname}/key/user_1/id_rsa`, 'utf-8')

    let message = req.body.message
    fs.readFileSync(`${pathname}/key/user_2/id_rsa.pub`, 'utf-8')
    message['assignTo'] = fs.readFileSync(`${pathname}/key/user_2/id_rsa.pub`, 'utf-8');
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
  })
}
