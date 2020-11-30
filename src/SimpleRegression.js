import React, { useState } from "react";
import { Math, CalculateAverage } from "./Math";

const CalculateMultiply = (x, y) => {
  const multi = [];
  for (let i = 0; i < x.length; i++) {
    multi[i] = x[i] * y[i];
  }
  return multi;
};

const CalculateCoefficient = (explanatory, response) => {
  const xx = explanatory.map((value) => {
    return value * value;
  });
  const xy = CalculateMultiply(explanatory, response);
  var matrix = Math.matrix([
    [CalculateAverage(xx), CalculateAverage(explanatory)],
    [CalculateAverage(explanatory), 1],
  ]);
  if (Math.det(matrix._data) === 0) {
    return;
  }
  var inversedMatrix = Math.inv(matrix._data);

  const coefficient = Math.multiply(inversedMatrix, [
    CalculateAverage(xy),
    CalculateAverage(response),
  ]);
  console.log(coefficient);
  return coefficient;
};

const SimpleRegression = () => {
  const [valueTable, setValueTable] = useState([
    {
      explanatoryColumn: 0,
      responseColumn: 0,
    },
  ]);

  const handleAddRow = () => {
    const newRow = { explanatoryColumn: 0, responseColumn: 0 };
    setValueTable([...valueTable, newRow]);
  };

  const handleDeleteRow = () => {
    const _copiedValueTable = [...valueTable];
    _copiedValueTable.pop();
    setValueTable(_copiedValueTable);
  };

  const handleChangeInputValue = (index, key) => (e) => {
    const newTable = [...valueTable];
    newTable[index][key] = parseInt(e.target.value);
    setValueTable(newTable);
  };

  var t = valueTable.map((value, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input
            type="number"
            onChange={handleChangeInputValue(index, "explanatoryColumn")}
            value={value.explanatoryColumn}
          />
        </td>
        <td>
          <input
            type="number"
            onChange={handleChangeInputValue(index, "responseColumn")}
            value={value.responseColumn}
          />
        </td>
      </tr>
    );
  });

  console.log(valueTable);

  return (
    <div>
      単回帰分析
      <table>
        <thead>
          <tr>
            <td>{"No."}</td>
            <td>{"explanatory"}</td>
            <td>{"response"}</td>
          </tr>
        </thead>
        <tbody>{t}</tbody>
      </table>
      <button onClick={() => handleAddRow()}>Add</button>
      <button onClick={() => handleDeleteRow()}>Delete</button>
      <button
        onClick={() =>
          CalculateCoefficient(
            valueTable.map((value) => {
              return value.explanatoryColumn;
            }),
            valueTable.map((value) => {
              return value.responseColumn;
            })
          )
        }
      >
        Calculate
      </button>
    </div>
  );
};

export default SimpleRegression;
