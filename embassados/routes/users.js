var express = require('express');
var router = express.Router();
var users = require('../resources/users_db')

router.post('/register', function (req, res, next) {
  users.registerSensorData(req.body.name, req.body.data, req.body.timestamp).then((resp) => res.send(resp)).catch((err) => console.log(err))
});

router.get('/', function (req, res, next) {
  res.send("pls, send data")
});

router.get('/sensores', function (req, res, next) {
  users.getSensorData().then((resp) => res.send(resp)).catch((err) => console.log(err))
});

router.get('/tempo', function (req, res, next) {
  res.send({"time":(new Date().getTime() / 1000).toString()})
});

module.exports = router;
