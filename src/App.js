import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import MyContext from "./MyContext";

const Advanced = lazy(() => import("./Advanced"));

// Route 기반 코드 스플리팅
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <MyContext />
      <Switch>
        <Route exact path="/" component={Advanced} />
        <Route path="/Advanced" component={Advanced} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
