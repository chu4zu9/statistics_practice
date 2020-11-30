import { create, all } from "mathjs";

// create a mathjs instance with configuration
const config = {
  epsilon: 1e-12,
  matrix: "Matrix",
  number: "number",
  precision: 64,
  predictable: false,
  randomSeed: null,
};

export const Math = create(all, config);

export const CalculateAverage = (datas) => {
  return Math.mean(datas);
};

export const CalculateStandardDeviation = (datas) => {
  return Math.std(datas);
};
