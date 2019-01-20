import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import MyContext from "./MyContext";
import MyErrorBoundary from "./MyErrorBoundary";

const Advanced = lazy(() => import("./Advanced"));

// Route 기반 코드 스플리팅
const App = () => (
  <Router>
    {/* Suspense 상위에 에러경계 */}
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <MyContext />
        <Switch>
          <Route exact path="/" component={Advanced} />
          <Route path="/Advanced" component={Advanced} />
        </Switch>
      </Suspense>
    </MyErrorBoundary>
  </Router>
);

export default App;
