import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTarea from "./components/add-tarea.component";
import Tarea from "./components/tarea.component";
import TareasList from "./components/tareas-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tareas"} className="navbar-brand">
            COOPEUCH-CRUD
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tareas"} className="nav-link">
                Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tareas"]} component={TareasList} />
            <Route exact path="/add" component={AddTarea} />
            <Route path="/tareas/:id" component={Tarea} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
