import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [valueTable, setValueTable] = useState([
    {
      xColumn: "0",
      yColumn: "0",
    },
  ]);

  const handleAddRow = () => {
    const newRow = { xColumn: "0", yColumn: "0" };
    setValueTable([...valueTable, newRow]);
  };

  const handleDeleteRow = () => {
    const _copiedValueTable = [...valueTable];
    _copiedValueTable.pop();
    setValueTable(_copiedValueTable);
  };

  const handleChangeInputValue = (index, key) => (e) => {
    const newTable = [...valueTable];
    newTable[index] = {
      ...valueTable,
      [key]: e.target.value,
    };
    setValueTable(newTable);
  };

  var t = valueTable.map((value, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input
            onChange={handleChangeInputValue(index, "xColumn")}
            value={value.xColumn}
          />
        </td>
        <td>
          <input
            onChange={handleChangeInputValue(index, "yColumn")}
            value={value.yColumn}
          />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>{"No."}</td>
            <td>{"x"}</td>
            <td>{"y"}</td>
          </tr>
        </thead>
        <tbody>{t}</tbody>
      </table>
      <button onClick={() => handleAddRow()}>Add</button>
      <button onClick={() => handleDeleteRow()}>Delete</button>
    </div>
  );
};

export default App;
