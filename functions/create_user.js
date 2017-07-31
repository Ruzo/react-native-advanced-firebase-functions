const admin = require("firebase-admin");

module.exports = function(req, res){
  if (!req.body.phone) {
    return res.status(422).send({error: "No phone provided"});
  } else {
    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    if (phone) {
      admin.auth().createUser({
        uid: phone
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(422).send({ error }));
    } else {
      res.status(422).send({error: "Phone number is invalid!"});
    }
  }
};