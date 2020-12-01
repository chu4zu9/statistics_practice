import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Math } from "../Math";
import CsvFile from "../CsvFile";

let FileData = null;
const HeaderHeight = 32;
const RowHeight = 32;

const CalculateCoefficient = (explanatories, response) => {
  return Math.multiply(
    Math.multiply(
      Math.inv(
        Math.multiply(Math.transpose(Math.matrix(explanatories)), Math.matrix(explanatories))
      ),
      Math.transpose(Math.matrix(explanatories))
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

const CalculateUnbiasedVariance = (responses, predictedValues, sampleNumber, explanatoryNumber) => {
  let sumError = 0;
  for (let i = 0; i < responses.length; i++) {
    sumError += Math.square(responses[i] - predictedValues[i]);
  }
  return sumError / (sampleNumber - explanatoryNumber);
};

const CalculateStandardError = (unbiasedVariance) => {
  return Math.sqrt(unbiasedVariance);
};

const CalculateStandardErrorOfCoefficients = (
  unbiasedVariance,
  explanatories,
  explanatoryNumber
) => {
  let standardErrorsPerExplanatory = [];
  for (let i = 0; i < explanatoryNumber; i++) {
    standardErrorsPerExplanatory[i] = Math.sqrt(
      Math.inv(
        Math.multiply(Math.transpose(Math.matrix(explanatories)), Math.matrix(explanatories))
      )._data[i][i] * unbiasedVariance
    );
  }
  return standardErrorsPerExplanatory;
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
      FileData = new CsvFile(reader.result);
      UpdateDataGrid();
      var coefficients = CalculateCoefficient(
        FileData.ExplanatoryDataWithInterceptPart,
        FileData.ResponseData
      );
      console.log(coefficients);

      const rSquared = CalculateRSquared(
        CalculatePredictedValues(coefficients, FileData.ExplanatoryDataWithInterceptPart),
        FileData.ResponseData
      );
      console.log(rSquared);

      const adjustedRSquared = CalculateAdjustedRSquared(
        rSquared,
        FileData.SampleNumber,
        FileData.ExplanatoryNumber
      );
      console.log(adjustedRSquared);

      const unbiasedVariance = CalculateUnbiasedVariance(
        FileData.ResponseData,
        CalculatePredictedValues(coefficients, FileData.ExplanatoryDataWithInterceptPart),
        FileData.SampleNumber,
        FileData.ExplanatoryNumber
      );

      const standardError = CalculateStandardError(unbiasedVariance);
      console.log(standardError);

      const standardErrorOfCoefficients = CalculateStandardErrorOfCoefficients(
        unbiasedVariance,
        FileData.ExplanatoryDataWithInterceptPart,
        FileData.ExplanatoryNumber
      );
      console.log(standardErrorOfCoefficients);
    };

    reader.readAsText(e.target.files[0]);
  };

  const UpdateDataGrid = () => {
    const columns = FileData.Header.map((value) => {
      return { field: value };
    });

    const rows = [{}];
    for (let i = 0; i < FileData.Data.length; i++) {
      const row = {};
      for (let j = 0; j < FileData.Header.length; j++) {
        const key = FileData.Header[j];
        row[key] = parseInt(FileData.Data[i][j]);
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
            setFileReadState(false);
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
