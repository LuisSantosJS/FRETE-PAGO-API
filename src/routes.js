const express = require('express');
const EmailController = require('./controllers/Emailcontroller');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => res.send('VAZA'));

routes.post('/users/send_email', EmailController.emailSend);

routes.get('/users', UserController.index);
routes.post('/user/create', UserController.create);
routes.post('/user/update', UserController.updateUser);
routes.post('/user/validade', UserController.valid);



module.exports = routes;