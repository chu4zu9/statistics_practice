const DataToArraySeparatedNewLine = (data) => {
  return data.split("\n");
};

const DataToArraySeparatedComma = (data) => {
  return data.split(",");
};

export default class CsvFile {
  #FileData;
  constructor(fileData) {
    this.FileData = fileData;
  }

  get Data() {
    const fileDataSeparatedByNewLine = DataToArraySeparatedNewLine(this.FileData);

    const result = [];
    for (let i = 0; i < fileDataSeparatedByNewLine.length; i++) {
      result[i] = DataToArraySeparatedComma(fileDataSeparatedByNewLine[i]);
    }
    result.shift();

    return result;
  }

  get NonIdData() {
    return this.Data.map((array) => {
      array.shift();
      return array;
    });
  }

  get Header() {
    return DataToArraySeparatedComma(DataToArraySeparatedNewLine(this.FileData)[0]);
  }

  get ExplanatoryData() {
    return this.NonIdData.map((array) => {
      array.pop();
      return array;
    });
  }

  get ExplanatoryDataWithInterceptPart() {
    return this.ExplanatoryData.map((array) => {
      array.unshift(1);
      return array;
    });
  }

  get ResponseData() {
    return this.NonIdData.map((array) => {
      return array[array.length - 1];
    });
  }

  get SampleNumber() {
    return this.Data.length;
  }

  get ExplanatoryNumber() {
    return this.ExplanatoryDataWithInterceptPart[0].length;
  }
}