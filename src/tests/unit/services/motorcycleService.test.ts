import { expect } from "chai";
import Sinon from "sinon";
import MotorcycleService from "../../../services/MotorcycleService";
import MotorcycleModel from "../../../models/MotorcycleModel";
import { listResponseMock, oneResponseMock } from "../../mocks/motorcycleMocks";
// import { Err, ErrMsg } from "../../../utils";


describe('MotorcycleService', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  describe('Testa a função Create do Service', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'create')
      .onFirstCall().resolves(oneResponseMock);
    });

    after(() => {
      (motorcycleModel.create as sinon.SinonStub).restore();
    });

    it('Deve retornar a moto criado', async () => {
      const result = await motorcycleService.create(oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });

  describe('Testa a função Read do Service', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'read').resolves(listResponseMock);
    });

    after(() => {
      (motorcycleModel.read as sinon.SinonStub).restore();
    });

    it('Deve retornar um array com as motos', async () => {
      const result = await motorcycleService.read();

      expect(result).to.be.an('array');
      expect(result).to.be.deep.eq(listResponseMock);
    });
  });

  describe('Testa a função ReadOne do Service', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'readOne')
      .onFirstCall().resolves(oneResponseMock)
      .onSecondCall().rejects(null);
    });

    after(() => {
      (motorcycleModel.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar a moto pelo ID', async () => {
      const result = await motorcycleService.readOne("6254b9a77f159da441f718c5");

      expect(result).to.be.deep.eq(oneResponseMock);
    });

    // it('Deve retornar um erro de Not Found', async () => {
    //     expect(await motorcycleService.readOne("6254b9a77f159da441f718c5"))
    //     .to.throw(new Err());
    // });
  });

  describe('Testa a função Delete do Service', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'delete').resolves();
      Sinon.stub(motorcycleModel, 'readOne').resolves(oneResponseMock);
    });

    after(() => {
      (motorcycleModel.delete as sinon.SinonStub).restore();
      (motorcycleModel.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar Deletar a moto', async () => {
      const result = await motorcycleService.delete("6254b9a77f159da441f718c5");
      console.log(result);
      
      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função Update do Service', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'update').resolves(oneResponseMock);
    });

    after(() => {
      (motorcycleModel.update as sinon.SinonStub).restore();
    });

    it('Deve retornar a moto com update', async () => {
      const result = await motorcycleService.update("6254b9a77f159da441f718c5", oneResponseMock);

      expect(result).to.be.deep.eq(oneResponseMock);
    });
  });
});