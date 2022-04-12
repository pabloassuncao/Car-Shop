import { expect } from "chai";
import Sinon from "sinon";
import MotorcycleModel from "../../../models/MotorcycleModel";
import { listResponseMock, oneResponseMock } from "../../mocks/motorcycleMocks";

const motorcycleModel = new MotorcycleModel();

describe('MotorcycleModel', () => {
  describe('Testa a função Create do Model', () => {
    before(() => {
      Sinon.stub(motorcycleModel.model, 'create').resolves(oneResponseMock);
    });

    after(() => {
      (motorcycleModel.model.create as sinon.SinonStub).restore();
    });

    it('Deve retornar a moto criado', async () => {
      const result = await motorcycleModel.create(oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Read do Model', () => {
    before(() => {
      Sinon.stub(motorcycleModel.model, 'find').resolves(listResponseMock as any);
    });

    after(() => {
      (motorcycleModel.model.find as sinon.SinonStub).restore();
    });

    it('Deve retornar um array com as motos', async () => {
      const result = await motorcycleModel.read();

      expect(result).to.be.an('array');
      expect(result).to.be.deep.eq(listResponseMock);
    });
  });

  describe('Testa a função ReadOne do Model', () => {
    before(() => {
      Sinon.stub(motorcycleModel.model, 'findById').resolves(oneResponseMock as any);
    });

    after(() => {
      (motorcycleModel.model.findById as sinon.SinonStub).restore();
    });

    it('Deve retornar a moto pelo ID', async () => {
      const result = await motorcycleModel.readOne("6254b9a77f159da441f718c5");

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Delete do Model', () => {
    before(() => {
      Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves();
    });

    after(() => {
      (motorcycleModel.model.findByIdAndDelete as sinon.SinonStub).restore();
    });

    it('Deve retornar Deletar a moto', async () => {
      const result = await motorcycleModel.delete("6254b9a77f159da441f718c5");

      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função Update do Model', () => {
    before(() => {
      Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves(oneResponseMock as any);
    });

    after(() => {
      (motorcycleModel.model.findByIdAndUpdate as sinon.SinonStub).restore();
    });

    it('Deve retornar a moto com update', async () => {
      const result = await motorcycleModel.update("6254b9a77f159da441f718c5", oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });
});