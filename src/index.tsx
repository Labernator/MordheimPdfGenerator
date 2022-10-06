import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";
import { LandingPage, PdfCreationPage } from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app-body">
        <Switch>
          <Route path="/PdfExport" component={PdfCreationPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
