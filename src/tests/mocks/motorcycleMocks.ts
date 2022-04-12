import { Motorcycle } from "../../interfaces/MotorcycleInterface";

export const oneResponseMock = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: 'Street' as Motorcycle['category'],
  engineCapacity: 125,
}

export const listResponseMock = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "black",
    buyValue: 3500,
    category: 'Street' as Motorcycle['category'],
    engineCapacity: 125,
  },
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Kawazaki ZX-6",
    year: 2022,
    color: "red",
    buyValue: 36000,
    category: 'Street' as Motorcycle['category'],
    engineCapacity: 2000,
  },
]