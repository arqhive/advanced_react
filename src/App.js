import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Advanced = lazy(() => import("./Advanced"));

// Route 기반 코드 스플리팅
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Advanced} />
        <Route path="/Advanced" component={Advanced} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
