import { expect } from "chai";
import Sinon from "sinon";
import CarService from "../../../services/CarService";
import CarModel from "../../../models/CarModel";
import { listResponseMock, oneResponseMock } from "../../mocks/carMocks";


describe('CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Testa a função Create do Service', () => {
    before(() => {
      Sinon.stub(carModel, 'create').resolves(oneResponseMock);
    });

    after(() => {
      (carModel.create as sinon.SinonStub).restore();
    });

    it('Deve retornar o carro criado', async () => {
      const result = await carService.create(oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Read do Service', () => {
    before(() => {
      Sinon.stub(carModel, 'read').resolves(listResponseMock);
    });

    after(() => {
      (carModel.read as sinon.SinonStub).restore();
    });

    it('Deve retornar um array com os carros', async () => {
      const result = await carService.read();

      expect(result).to.be.an('array');
      expect(result).to.be.deep.eq(listResponseMock);
    });
  });

  describe('Testa a função ReadOne do Service', () => {
    before(() => {
      Sinon.stub(carModel, 'readOne').resolves(oneResponseMock);
    });

    after(() => {
      (carModel.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar o carro pelo ID', async () => {
      const result = await carService.readOne("6254b9a77f159da441f718c5");

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Delete do Service', () => {
    before(() => {
      Sinon.stub(carModel, 'delete').resolves();
      Sinon.stub(carModel, 'readOne').resolves(oneResponseMock);
    });

    after(() => {
      (carModel.delete as sinon.SinonStub).restore();
      (carModel.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar Deletar o carro', async () => {
      const result = await carService.delete("6254b9a77f159da441f718c5");
      console.log(result);
      
      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função Update do Service', () => {
    before(() => {
      Sinon.stub(carModel, 'update').resolves(oneResponseMock);
    });

    after(() => {
      (carModel.update as sinon.SinonStub).restore();
    });

    it('Deve retornar o carro com update', async () => {
      const result = await carService.update("6254b9a77f159da441f718c5", oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });
});