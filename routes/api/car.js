import crypto from 'crypto'
import fs from 'fs'

const router = express.Router();
const ownerPub = fs.readFileSync('../../key/public.pub', 'utf-8').toString();
var owner = {
  isOwner:true,
  period: {
    start: 0,
    end: 0
  }
}
var user = {};
user[ownerPub] = owner;
var lock = true;
router.put('/car', (req, res) => {

  data = req.body.data;
  sig = req.body.sig;
  txPubKey = reg.body.publicKey;

  var check = false;
  for(var key in user){
    if(key==txPubKey){
      check = true;
    }
  }
  if(!check){
    return res.json({
      'message': 'Dont authen'
    })
  }
  const signer = crypto.createSign('sha256');
  signer.update(data);

  const verifier = crypto.createVerify('sha256');
  verifier.write(data);
  verifier.end();

  if(!verifiy.verify(txPubKey, sig)) {
    return res.json({
      'message': 'Dont authen'
    })
  }

  if(data.type == 'regisKey') {
    if(user[txPubKey].isOnwer){
      user[data.message.assignTo].period = data.message.period;
      user[data.message.assignTo].isOwner = false;
      
    }
    
  } else if(data.type == 'command') {
    if(!user[txPubKey].isOnwer){
      if(Date.now() < user[txPubKey].period.start){
        return res.json({
          'message': 'Too early'
        })
      }
      if(Date.now() > user[txPubKey].period.end){
        return res.json({
          'message': 'Too late'
        })
      }
    }
    lock = data.message.lock;
  } else {
    return res.json({
      'message': 'False data type'
    })    
  }  
});

export default router;