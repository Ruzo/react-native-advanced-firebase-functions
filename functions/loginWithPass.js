const admin = require('firebase-admin');

const db = admin.database();
const ref = db.ref('users');

module.exports = function(req, res) {
  if(!req.body.phone) return res.status(422).send({error: 'Please provide a valid phone number!'});
  if(!req.body.code) return res.status(422).send({error: 'Please provide a valid code!'});
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);
  admin.auth().getUser(phone)
    .then(userRecord => {
      const phoneRef = ref.child(phone);
      phoneRef.once("value", function(snapshot){
        const data = snapshot.val();
        if(data.code === code && data.valid === true){
          phoneRef.update({ valid: false });
          admin.auth().createCustomToken(phone)
            .then(function(token){
              res.status(200).send({ token });
            })
            .catch(error => res.status(422).send({ error }));
        }
        else {
          res.status(422).send({ error: 'Code is not valid!'});
        }
      });
    })
    .catch(err => res.status(422).send({ message: "User was not found!", error: err }));
}