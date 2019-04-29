import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Location from "./component/Location";
import Category from "./component/Category";
import { NavbarTop, NavbarBottom } from "./component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryForm from "./component/CategoryForm";
import LocationForm from "./component/LocationForm";
import LocationDetail from "./component/LocationDetail";
import page404 from "./component/page404";

function App() {
  return (
    <div className="App">
      <NavbarTop />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Category} />
          <Route exact path="/add-category" component={CategoryForm} />
          <Route
            exact
            path="/view-category-location/:categoryName"
            component={Location}
          />
          <Route
            exact
            path="/edit-category/:catIndex"
            component={CategoryForm}
          />
          <Route exact path="/location" component={Location} />
          <Route
            exact
            path="/location-detail/:locIndex"
            component={LocationDetail}
          />
          <Route exact path="/add-location" component={LocationForm} />
          <Route
            exact
            path="/edit-location/:locIndex"
            component={LocationForm}
          />
          <Route path="*" component={page404} status={404} />
        </Switch>
      </BrowserRouter>

      <NavbarBottom />
    </div>
  );
}

export default App;
