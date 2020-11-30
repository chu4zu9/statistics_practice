import "./App.css";
import React from "react";
import SimpleRegression from "./components/SimpleRegression";
import MultipleRegression from "./components/MultipleRegression";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  var rootPath = "/statistics_practice";
  var top = () => {
    return (
      <div>
        統計処理の練習ページ
        <p>
          <Link to={rootPath + "/simpleregression"}>単回帰分析</Link>
        </p>
        <p>
          <Link to={rootPath + "/multipleregression"}>重回帰分析</Link>
        </p>
      </div>
    );
  };
  var simple = () => {
    return (
      <div>
        <SimpleRegression />
        <Link to={rootPath + "/"}>トップへ</Link>
      </div>
    );
  };

  var multiple = () => {
    return (
      <div>
        <MultipleRegression />
        <Link to={rootPath + "/"}>トップへ</Link>
      </div>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path={rootPath + "/"} component={top} />
        <Route exact path={rootPath + "/simpleregression"} component={simple} />
        <Route exact path={rootPath + "/multipleregression"} component={multiple} />
      </Switch>
    </Router>
  );
};

export default App;
