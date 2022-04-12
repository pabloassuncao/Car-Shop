import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server from '../../../server';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';

import { listResponseMock, oneResponseMock } from "../../mocks/carMocks";
import { HttpStatus } from '../../../utils';

chai.use(chaiHttp);

const { expect } = chai;

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);
const app = server.getApp();

describe('Testa os endpoints do /cars', () => {
  describe('Testa o endpoint de Create', () => {
    before(async () => {
      sinon
        .stub(carModel.model, "create")
        .resolves(oneResponseMock);
    });

    after(()=>{
      (carModel.model.create as sinon.SinonStub).restore();
    })

    it('Testa se insere um carro no Banco de Dados', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send({
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          doorsQty: 2,
          seatsQty: 2,
        });

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.CREATED);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.eq(oneResponseMock);
    });
  });
  
  describe('Testa o endpoint de Busca pelo Id', () => {
    before(async () => {
      sinon
      .stub(carModel.model, "findById")
      .onCall(0).resolves(oneResponseMock as any)
      .onCall(1).resolves(null);
    });

    after(()=>{
      (carModel.model.findById as sinon.SinonStub).restore();
    })

    it('Testa se retorna o carro pelo Id', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/cars/6254b9a77f159da441f718c5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.eq(oneResponseMock);
    });

    it('Testa se retorna erro com ID inexistente', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/cars/6254b9a77f159da441f718r5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.NOT_FOUND);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.haveOwnProperty('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });

    it('Testa se retorna erro com ID menor que o esperado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/cars/f718r5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.BAD_REQUEST);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.haveOwnProperty('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Id must have 24 hexadecimal characters');
    });
  });

  describe('Testa o endpoint de Buscar Todos', () => {
    before(async () => {
      sinon
        .stub(carModel.model, "find")
        .resolves(listResponseMock as any);
    });

    after(()=>{
      (carModel.model.find as sinon.SinonStub).restore();
    })

    it('Testa se recebe uma lista de carros', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/cars');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.eq(listResponseMock);
    });
  });

  describe('Testa o endpoint do Update', () => {
    before(async () => {
      sinon
        .stub(carModel.model, "findByIdAndUpdate")
        .resolves(listResponseMock[1] as any);
    });

    after(()=>{
      (carModel.model.findByIdAndUpdate as sinon.SinonStub).restore();
    })

    it('Testa se atualiza um carro', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .put('/cars/6254b9a77f159da441f718c5')
        .send({
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          doorsQty: 2,
          seatsQty: 2,
        });

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.eq({
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        doorsQty: 2,
        seatsQty: 2,
      });
    });
  });

  describe('Testa o endpoint de Deletar', () => {
    before(async () => {
      sinon
        .stub(carModel.model, "findByIdAndDelete")
        .resolves(null);

      sinon
        .stub(carModel.model, "findById")
        .resolves(oneResponseMock as any);
    });

    after(()=>{
      (carModel.model.findByIdAndDelete as sinon.SinonStub).restore();
      (carModel.model.findById as sinon.SinonStub).restore();
    })

    it('Testa se deleta um carro', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .delete('/cars/6254b9a77f159da441f718c5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK_NO_CONTENT);
      expect(chaiHttpResponse.body).to.be.deep.eq({});
    });
  });
});