import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
} from "@material-ui/core";
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
  let standardErrorOfCoefficients = [];
  for (let i = 0; i < explanatoryNumber; i++) {
    standardErrorOfCoefficients[i] = Math.sqrt(
      Math.inv(
        Math.multiply(Math.transpose(Math.matrix(explanatories)), Math.matrix(explanatories))
      )._data[i][i] * unbiasedVariance
    );
  }
  return standardErrorOfCoefficients;
};

const CalculateTValue = (coefficients, standardErrorOfCoefficients) => {
  let tValue = [];
  for (let i = 0; i < coefficients.length; i++) {
    tValue[i] = coefficients[i] / standardErrorOfCoefficients[i];
  }
  return tValue;
};

const InputDatas = (props) => {
  const rowCount = props.rows.length < 5 ? props.rows.length : 5;
  return (
    <div style={{ height: 15 + HeaderHeight + RowHeight * rowCount }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        hideFooter={true}
        rowHeight={RowHeight}
        headerHeight={HeaderHeight}
      />
    </div>
  );
};

const MultipleRegressionResult = (props) => {
  var coefficients = CalculateCoefficient(
    FileData.ExplanatoryDataWithInterceptPart,
    FileData.ResponseData
  );

  const rSquared = CalculateRSquared(
    CalculatePredictedValues(coefficients, FileData.ExplanatoryDataWithInterceptPart),
    FileData.ResponseData
  );

  const adjustedRSquared = CalculateAdjustedRSquared(
    rSquared,
    FileData.SampleNumber,
    FileData.ExplanatoryNumber
  );

  const unbiasedVariance = CalculateUnbiasedVariance(
    FileData.ResponseData,
    CalculatePredictedValues(coefficients, FileData.ExplanatoryDataWithInterceptPart),
    FileData.SampleNumber,
    FileData.ExplanatoryNumber
  );

  const standardError = CalculateStandardError(unbiasedVariance);

  const standardErrorOfCoefficients = CalculateStandardErrorOfCoefficients(
    unbiasedVariance,
    FileData.ExplanatoryDataWithInterceptPart,
    FileData.ExplanatoryNumber
  );

  const tValue = CalculateTValue(coefficients, standardErrorOfCoefficients);

  const createRegressionStatistics = (name, value) => {
    return { name, value };
  };

  let regressionStatistics = [
    createRegressionStatistics("決定係数 R^2", rSquared),
    createRegressionStatistics("補正 R^2", adjustedRSquared),
    createRegressionStatistics("標準誤差", standardError),
    createRegressionStatistics("データ数", FileData.SampleNumber),
  ];

  const createOtherData = (name, coefficient, standardErrorOfCoefficient, tValue) => {
    return { name, coefficient, standardErrorOfCoefficient, tValue };
  };

  let otherStatistics = [
    createOtherData("切片", coefficients[0], standardErrorOfCoefficients[0], tValue[0]),
  ];
  for (let i = 1; i < coefficients.length; i++) {
    otherStatistics[i] = createOtherData(
      props.columns[i].field,
      coefficients[i],
      standardErrorOfCoefficients[i],
      tValue[i]
    );
  }

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={8}>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>回帰統計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {regressionStatistics.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid item xs>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">係数</TableCell>
                  <TableCell align="center">標準誤差</TableCell>
                  <TableCell align="center">t値</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {otherStatistics.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.coefficient}</TableCell>
                    <TableCell align="right">{row.standardErrorOfCoefficient}</TableCell>
                    <TableCell align="right">{row.tValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
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
      console.log(FileData.NormalizedData);
      UpdateDataGrid();
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
        row[key] = parseFloat(FileData.Data[i][j]);
      }
      rows[i] = row;
    }
    setGridDatas({ columns: columns, rows: rows });
    setFileReadState(true);
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item xs>
          <h1>重回帰分析</h1>
        </Grid>
        <Grid item xs>
          <input
            type="file"
            accept=".csv"
            onChange={handleFiles()}
            onClick={(e) => {
              e.target.value = "";
              setFileReadState(false);
            }}
          />
        </Grid>

        <div>
          {isFileRead === true && (
            <div>
              <Grid item xs>
                <InputDatas columns={gridDatas.columns} rows={gridDatas.rows} />
              </Grid>
              <Grid item xs>
                <MultipleRegressionResult columns={gridDatas.columns} />
              </Grid>
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default MultipleRegression;
