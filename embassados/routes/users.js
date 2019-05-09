var express = require('express');
var router = express.Router();
var users = require('../resources/users_db')

router.post('/register', function (req, res, next) {
  users.registerSensorData(req.body.email, req.body.password, req.body.username).then((resp) => res.send(resp)).catch((err) => console.log(err))
});

router.get('/', function (req, res, next) {
  res.send("pls, send data")
});

module.exports = router;
