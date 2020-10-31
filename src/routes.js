const express = require('express');
const EmailController = require('./controllers/Emailcontroller');
const UserController = require('./controllers/UserTruckController');

const routes = express.Router();



routes.get('/truck/users/index', UserController.index);
routes.post('/truck/users/create', UserController.create);
routes.post('/truck/users/validate', UserController.valid);
routes.post('/truck/users/login', UserController.login);
routes.get('/truck/users/status', UserController.showStatusUserTruck);

routes.post('/truck/users/status/update', UserController.updateStatusUserTruck);

routes.get('/', (req, res) => res.send('VAZA'));

routes.post('/send/email', EmailController.emailSend);

module.exports = routes;