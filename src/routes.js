const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multerConfig');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FilesController');
const authMiddlewares = require('./app/middlewares/auth');
const ProviderController = require('./app/controllers/ProviderController');
const AppointmentController = require('./app/controllers/AppointmentController');
const ScheduleController = require('./app/controllers/ScheduleController');
const NotificationController = require('./app/controllers/NotificationsController');
const AvailableController = require('./app/controllers/AvailableController');

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.get('/providers', ProviderController.index);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);
routes.get('/notification', NotificationController.index);
routes.get('/providers/:provider_id/available', AvailableController.index);

routes.post('/appointments', AppointmentController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.put('/users', UserController.update);
routes.put('/notification/:id', NotificationController.update);

routes.delete('/appointments/:id', AppointmentController.delete);









module.exports = routes;
