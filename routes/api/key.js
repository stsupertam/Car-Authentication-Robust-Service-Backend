import crypto from 'crypto'
import fs from 'fs'
import ursa from 'ursa'

const router = express.Router();

router.post('/message', (req, res) => {
  // privateKeyPath = '../../crypto/private/'
  const private_key = fs.readFileSync('private.pem', 'utf-8').toString();
  const private_key = fs.readFileSync('../../crypto/private/private.pem', 'utf-8')
  const public_key = fs.readFileSync('../../crypto/public/public.pub', 'utf-8')
  const message = 'test'
  
  const signer = crypto.createSign('sha256');
  signer.update(message);
  signer.end();
  
  const signature = signer.sign(private_key)
  const signature_hex = signature.toString('hex')
  
  const verifier = crypto.createVerify('sha256');
  verifier.update(message);
  verifier.end();
  
  const verified = verifier.verify(public_key, signature_hex, 'hex');
  
  res.json({
    message: message,
    signature: signature_hex,
    verified: verified
  })
  console.log(JSON.stringify({
      message: message,
      signature: signature_hex,
      verified: verified,
  }, null, 2));  
});

export default router;