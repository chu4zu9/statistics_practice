import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

var FileData = null;
const HeaderHeight = 56;
const RowHeight = 52;

const DataToArraySeparatedNewLine = (data) => {
  return data.split("\n");
};

const DataToArraySeparatedComma = (data) => {
  return data.split(",");
};

const TakeDataFromCsvData = (csvData) => {
  const separatedByNewLine = DataToArraySeparatedNewLine(csvData);

  const result = [];
  for (var i = 0; i < separatedByNewLine.length; i++) {
    result[i] = DataToArraySeparatedComma(separatedByNewLine[i]);
  }
  result.shift();

  return result;
};

const TakeNonIdDataFromCsvData = (csvData) => {
  return TakeDataFromCsvData(csvData).map((array) => {
    array.shift();
    return array;
  });
};

const TakeHeaderFromCsvData = (csvData) => {
  return DataToArraySeparatedComma(DataToArraySeparatedNewLine(csvData)[0]);
};

const MultipleRegression = () => {
  const [gridDatas, setGridDatas] = useState({
    columns: [{ field: "id" }, { field: "x1" }, { field: "x2" }, { field: "y" }],
    rows: [
      { id: 1, x1: 0, x2: 0, y: 0 },
      { id: 2, x1: 0, x2: 0, y: 0 },
      { id: 2, x1: 0, x2: 0, y: 0 },
    ],
  });

  const handleFiles = () => (e) => {
    console.log("Called handleFiles");
    if (e.target.files.length === 0) {
      FileData = null;
      setGridDatas({ columns: {}, rows: {} });
      return;
    }

    var reader = new FileReader();
    reader.onload = () => {
      FileData = reader.result;
      UpdateDataGrid(FileData);
    };

    reader.readAsText(e.target.files[0]);
  };

  const UpdateDataGrid = (csvFile) => {
    const columns = TakeHeaderFromCsvData(csvFile).map((value) => {
      return { field: value };
    });

    const rows = [{}];
    for (var i = 0; i < TakeDataFromCsvData(csvFile).length; i++) {
      const row = {};
      for (var j = 0; j < TakeHeaderFromCsvData(csvFile).length; j++) {
        const key = TakeHeaderFromCsvData(csvFile)[j];
        row[key] = parseInt(TakeDataFromCsvData(csvFile)[i][j]);
      }
      rows[i] = row;
    }
    console.log(columns);
    console.log(rows);
    setGridDatas({ columns: columns, rows: rows });
  };

  console.log("render");
  console.log(gridDatas.columns);
  console.log(gridDatas.rows);
  return (
    <div>
      重回帰分析
      <p>
        <input type="file" onChange={handleFiles()} />
      </p>
      {FileData !== null && (
        <div style={{ height: HeaderHeight + RowHeight * gridDatas.rows.length }}>
          <DataGrid
            rows={gridDatas.rows}
            columns={gridDatas.columns}
            autoHeight={true}
            hideFooter={true}
          />
        </div>
      )}
    </div>
  );
};

export default MultipleRegression;
