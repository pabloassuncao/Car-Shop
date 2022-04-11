import CustomRouter from '../routes/Router';
import App from '../app';

import CarController from '../controllers/CarController';

import { Car } from '../interfaces/CarInterface';

require('express-async-errors');

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

server.startServer();
