const admin = require('firebase-admin');
const twilio = require('twilio');

const db = admin.database();
const ref = db.ref('users');
const twilioClient = new twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

module.exports = function(req, res) {
  if(!req.body.phone)return res.status(422).send({error: 'No phone number provided!'});
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      ref.child(phone).set({
        code: code,
        valid: true
      }, function(error) {
        if(error){
          res.send({ error })
        }
        else {
          twilioClient.messages.create({
            body: `Your login code: ${code}`,
            to: phone,
            from: '+15162178083'
          }, function(err, message) {
            if(err) res.status(422).send({error: error});
            else res.sendStatus(200);
          })
        }
      })
    })
    .catch(err => res.status(422).send({ message: "User was not found!", error: err }));
}