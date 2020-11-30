import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Math } from "../Math";

var FileData = null;
const HeaderHeight = 32;
const RowHeight = 32;

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

const TakeXDataFromCsvData = (csvData) => {
  return TakeNonIdDataFromCsvData(csvData).map((array) => {
    array.pop();
    return array;
  });
};

const TakeXDataWithInterceptPartFromCsvData = (csvData) => {
  return TakeXDataFromCsvData(csvData).map((array) => {
    array.unshift(1);
    return array;
  });
};

const TakeYDataFromCsvData = (csvData) => {
  return TakeNonIdDataFromCsvData(csvData).map((array) => {
    return array[array.length - 1];
  });
};

const CalculateCoefficient = (explanatory, response) => {
  return Math.multiply(
    Math.multiply(
      Math.inv(Math.multiply(Math.transpose(Math.matrix(explanatory)), Math.matrix(explanatory))),
      Math.transpose(Math.matrix(explanatory))
    ),
    Math.matrix(response)
  )._data;
};

const MultipleRegression = () => {
  const [gridDatas, setGridDatas] = useState({
    columns: [],
    rows: [],
  });

  const [isFileRead, setFileReadState] = useState(false);

  const handleFiles = () => (e) => {
    if (e.target.files.length === 0) {
      setFileReadState(false);
      FileData = null;
      setGridDatas({ columns: [], rows: [] });
      return;
    }

    var reader = new FileReader();
    reader.onload = () => {
      FileData = reader.result;
      UpdateDataGrid(FileData);
      var coefficient = CalculateCoefficient(
        TakeXDataWithInterceptPartFromCsvData(FileData),
        TakeYDataFromCsvData(FileData)
      );
      console.log(coefficient);
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
    setGridDatas({ columns: columns, rows: rows });
    setFileReadState(true);
  };

  var rowCount = gridDatas.rows.length < 5 ? gridDatas.rows.length : 5;
  return (
    <div>
      重回帰分析
      <p>
        <input
          type="file"
          onChange={handleFiles()}
          onClick={(e) => {
            e.target.value = "";
          }}
        />
      </p>
      {isFileRead === true && (
        <div style={{ height: 15 + HeaderHeight + RowHeight * rowCount, width: "100%" }}>
          <DataGrid
            rows={gridDatas.rows}
            columns={gridDatas.columns}
            hideFooter={true}
            rowHeight={RowHeight}
            headerHeight={HeaderHeight}
          />
        </div>
      )}
    </div>
  );
};

export default MultipleRegression;
