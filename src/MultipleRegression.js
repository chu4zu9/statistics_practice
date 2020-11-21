import React, { useState } from "react";

const MultipleRegression = () => {
  const csvToArray = (csvData) => {
    var separatedByNewLine = csvData.split("\n");
    var result = new Array();
    for (var i = 0; i < separatedByNewLine.length; i++) {
      result[i] = separatedByNewLine[i].split(",");
    }
    return result;
  };
  const handleFiles = () => (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    var reader = new FileReader();
    reader.onload = () => {
      var data = csvToArray(reader.result);
      console.log(data);
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      重回帰分析
      <input type="file" onChange={handleFiles()} />
    </div>
  );
};

export default MultipleRegression;
