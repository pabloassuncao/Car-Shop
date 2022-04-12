import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server from '../../../server';
import MotorcycleModel from '../../../models/MotorcycleModel';

import { listResponseMock, oneResponseMock } from "../../mocks/motorcycleMocks";
import { HttpStatus } from '../../../utils';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';

chai.use(chaiHttp);

const { expect } = chai;

const motorcycleModel = new MotorcycleModel();
const app = server.getApp();

describe('Testa os endpoints do /motorcycles', () => {
  describe('Testa o endpoint de Create', () => {
    before(async () => {
      sinon
        .stub(motorcycleModel.model, "create")
        .resolves(oneResponseMock);
    });

    after(()=>{
      (motorcycleModel.model.create as sinon.SinonStub).restore();
    })

    it('Testa se insere um carro no Banco de Dados', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "black",
          buyValue: 3500,
          category: 'Street' as Motorcycle['category'],
          engineCapacity: 125,
        });

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.CREATED);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.eq(oneResponseMock);
    });
  });
  
  describe('Testa o endpoint de Busca pelo Id', () => {
    before(async () => {
      sinon
        .stub(motorcycleModel.model, "findById")
        .onCall(0).resolves(oneResponseMock as any)
        .onCall(1).resolves(null);
    });

    after(()=>{
      (motorcycleModel.model.findById as sinon.SinonStub).restore();
    })

    it('Testa se retorna o carro pelo Id', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/motorcycles/6254b9a77f159da441f718c5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.eq(oneResponseMock);
    });

    it('Testa se retorna erro com ID inexistente', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/motorcycles/6254b9a77f159da441f718r5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.NOT_FOUND);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.haveOwnProperty('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });

    it('Testa se retorna erro com ID menor que o esperado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/motorcycles/f718r5');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.BAD_REQUEST);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.haveOwnProperty('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Id must have 24 hexadecimal characters');
    });
  });

  describe('Testa o endpoint de Buscar Todos', () => {
    before(async () => {
      sinon
        .stub(motorcycleModel.model, "find")
        .resolves(listResponseMock as any);
    });

    after(()=>{
      (motorcycleModel.model.find as sinon.SinonStub).restore();
    })

    it('Testa se recebe uma lista de carros', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/motorcycles');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.eq(listResponseMock);
    });
  });

  describe('Testa o endpoint do Update', () => {
    before(async () => {
      sinon
        .stub(motorcycleModel.model, "findByIdAndUpdate")
        .resolves(listResponseMock[1] as any);
    });

    after(()=>{
      (motorcycleModel.model.findByIdAndUpdate as sinon.SinonStub).restore();
    })

    it('Testa se recebe uma lista de carros', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .put('/motorcycles/4edd40c86762e0fb12000003')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "black",
          buyValue: 3500,
          category: 'Street' as Motorcycle['category'],
          engineCapacity: 125,
        });

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.eq({
        model: "Honda CG Titan 125",
        year: 1963,
        color: "black",
        buyValue: 3500,
        category: 'Street' as Motorcycle['category'],
        engineCapacity: 125,
      });
    });
  });

  describe('Testa o endpoint de Deletar', () => {
    before(async () => {
      sinon
        .stub(motorcycleModel.model, "findByIdAndDelete")
        .resolves(null);

      sinon
        .stub(motorcycleModel.model, "findById")
        .resolves(oneResponseMock as any);
    });

    after(()=>{
      (motorcycleModel.model.findByIdAndDelete as sinon.SinonStub).restore();
      (motorcycleModel.model.findById as sinon.SinonStub).restore();
    })

    it('Testa se deleta uma moto', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .delete('/motorcycles/4edd40c86762e0fb12000003');

      expect(chaiHttpResponse.status).to.be.equal(HttpStatus.OK_NO_CONTENT);
      expect(chaiHttpResponse.body).to.be.deep.eq({});
    });
  });
});