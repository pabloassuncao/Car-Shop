import { expect } from "chai";
import Sinon from "sinon";
import CarModel from "../../../models/CarModel";
import { listResponseMock, oneResponseMock } from "../../mocks/carMocks";

const carModel = new CarModel();

describe('CarModel', () => {
  describe('Testa a função Create do Model', () => {
    before(() => {
      Sinon.stub(carModel.model, 'create').resolves(oneResponseMock);
    });

    after(() => {
      (carModel.model.create as sinon.SinonStub).restore();
    });

    it('Deve retornar o carro criado', async () => {
      const result = await carModel.create(oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Read do Model', () => {
    before(() => {
      Sinon.stub(carModel.model, 'find').resolves(listResponseMock as any);
    });

    after(() => {
      (carModel.model.find as sinon.SinonStub).restore();
    });

    it('Deve retornar um array com os carros', async () => {
      const result = await carModel.read();

      expect(result).to.be.an('array');
      expect(result).to.be.deep.eq(listResponseMock);
    });
  });

  describe('Testa a função ReadOne do Model', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findById').resolves(oneResponseMock as any);
    });

    after(() => {
      (carModel.model.findById as sinon.SinonStub).restore();
    });

    it('Deve retornar o carro pelo ID', async () => {
      const result = await carModel.readOne("6254b9a77f159da441f718c5");

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Delete do Model', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findByIdAndDelete').resolves();
    });

    after(() => {
      (carModel.model.findByIdAndDelete as sinon.SinonStub).restore();
    });

    it('Deve retornar Deletar o carro', async () => {
      const result = await carModel.delete("6254b9a77f159da441f718c5");

      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função Update do Model', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(oneResponseMock as any);
    });

    after(() => {
      (carModel.model.findByIdAndUpdate as sinon.SinonStub).restore();
    });

    it('Deve retornar o carro com update', async () => {
      const result = await carModel.update("6254b9a77f159da441f718c5", oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });
});