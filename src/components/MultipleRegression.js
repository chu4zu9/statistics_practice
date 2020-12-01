import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Math } from "../Math";

let FileData = null;
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
  for (let i = 0; i < separatedByNewLine.length; i++) {
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

const TakeExplanatoryDataFromCsvData = (csvData) => {
  return TakeNonIdDataFromCsvData(csvData).map((array) => {
    array.pop();
    return array;
  });
};

const TakeExplanatoryDataWithInterceptPartFromCsvData = (csvData) => {
  return TakeExplanatoryDataFromCsvData(csvData).map((array) => {
    array.unshift(1);
    return array;
  });
};

const TakeResponseDataFromCsvData = (csvData) => {
  return TakeNonIdDataFromCsvData(csvData).map((array) => {
    return array[array.length - 1];
  });
};

const CountSampleNumber = (csvData) => {
  return TakeDataFromCsvData(csvData).length;
};

const CountExplanatoryNumber = (csvData) => {
  return TakeExplanatoryDataWithInterceptPartFromCsvData(csvData)[0].length;
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

const CalculatePredictedValues = (coefficient, explanatories) => {
  let predictedValues = [];
  let sum = 0;
  for (let i = 0; i < explanatories.length; i++) {
    for (let j = 0; j < coefficient.length; j++) {
      sum += coefficient[j] * explanatories[i][j];
    }
    predictedValues[i] = sum;
    sum = 0;
  }
  return predictedValues;
};

const CalculateRSquared = (predictedValues, sampleValues) => {
  return Math.variance(predictedValues) / Math.variance(sampleValues);
};

const CalculateAdjustedRSquared = (rSquared, sampleNumber, explanatoryNumber) => {
  return 1 - (1 - rSquared) * ((sampleNumber - 1) / (sampleNumber - explanatoryNumber));
};

const CalculateStandardError = (responses, predictedValues, sampleNumber, explanatoryNumber) => {
  let sumError = 0;
  for (let i = 0; i < responses.length; i++) {
    sumError += (responses[i] - predictedValues[i]) * (responses[i] - predictedValues[i]);
  }
  return Math.sqrt(sumError / (sampleNumber - explanatoryNumber));
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

    let reader = new FileReader();
    reader.onload = () => {
      FileData = reader.result;
      UpdateDataGrid(FileData);
      var coefficients = CalculateCoefficient(
        TakeExplanatoryDataWithInterceptPartFromCsvData(FileData),
        TakeResponseDataFromCsvData(FileData)
      );
      console.log(coefficients);

      const rSquared = CalculateRSquared(
        CalculatePredictedValues(
          coefficients,
          TakeExplanatoryDataWithInterceptPartFromCsvData(FileData)
        ),
        TakeResponseDataFromCsvData(FileData)
      );
      console.log(rSquared);

      const adjustedRSquared = CalculateAdjustedRSquared(
        rSquared,
        CountSampleNumber(FileData),
        CountExplanatoryNumber(FileData)
      );

      console.log(adjustedRSquared);

      const standardError = CalculateStandardError(
        TakeResponseDataFromCsvData(FileData),
        CalculatePredictedValues(
          coefficients,
          TakeExplanatoryDataWithInterceptPartFromCsvData(FileData)
        ),
        CountSampleNumber(FileData),
        CountExplanatoryNumber(FileData)
      );
      console.log(standardError);
    };

    reader.readAsText(e.target.files[0]);
  };

  const UpdateDataGrid = (csvFile) => {
    const columns = TakeHeaderFromCsvData(csvFile).map((value) => {
      return { field: value };
    });

    const rows = [{}];
    for (let i = 0; i < TakeDataFromCsvData(csvFile).length; i++) {
      const row = {};
      for (let j = 0; j < TakeHeaderFromCsvData(csvFile).length; j++) {
        const key = TakeHeaderFromCsvData(csvFile)[j];
        row[key] = parseInt(TakeDataFromCsvData(csvFile)[i][j]);
      }
      rows[i] = row;
    }
    setGridDatas({ columns: columns, rows: rows });
    setFileReadState(true);
  };

  const rowCount = gridDatas.rows.length < 5 ? gridDatas.rows.length : 5;
  return (
    <div>
      重回帰分析
      <p>
        <input
          type="file"
          accept=".csv"
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
