import CustomRouter from './routes/Router';
import App from './app';

import CarController from './controllers/CarController';
import MotorcycleController from './controllers/MotorcycleController';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

require('express-async-errors');

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
