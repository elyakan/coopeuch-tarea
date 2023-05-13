import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveTareas,
  findTareasByDescripcion,
  deleteAllTareas,
} from "../actions/tareas";
import { Link } from "react-router-dom";

class TareasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDescripcion = this.onChangeSearchDescripcion.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTarea = this.setActiveTarea.bind(this);
    this.findByDescripcion = this.findByDescripcion.bind(this);
    this.removeAllTareas = this.removeAllTareas.bind(this);

    this.state = {
      currentTarea: null,
      currentIndex: -1,
      searchDescripcion: "",
    };
  }

  componentDidMount() {
    this.props.retrieveTareas();
  }

  onChangeSearchDescripcion(e) {
    const searchDescripcion = e.target.value;

    this.setState({
      searchDescripcion: searchDescripcion,
    });
  }

  refreshData() {
    this.setState({
      currentTarea: null,
      currentIndex: -1,
    });
  }

  setActiveTarea(tarea, index) {
    this.setState({
      currentTarea: tarea,
      currentIndex: index,
    });
  }

  removeAllTareas() {
    this.props
      .deleteAllTareas()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByDescripcion() {
    this.refreshData();

    this.props.findTareasByDescripcion(this.state.searchDescripcion);
  }

  render() {
    const { searchDescripcion, currentTarea, currentIndex } = this.state;
    const { tareas } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por descripcion"
              value={searchDescripcion}
              onChange={this.onChangeSearchDescripcion}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByDescripcion}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tareas List</h4>

          <ul className="list-group">
            {tareas &&
              tareas.map((tarea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTarea(tarea, index)}
                  key={index}
                >
                  {tarea.descripcion}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTareas}
          >
            Elimina todo
          </button>
        </div>
        <div className="col-md-6">
          {currentTarea ? (
            <div>
              <h4>Tarea</h4>
              <div>
                <label>
                  <strong>Descripcion:</strong>
                </label>{" "}
                {currentTarea.descripcion}
              </div>
              <div>
                <label>
                  <strong>Fcreacion:</strong>
                </label>{" "}
                {currentTarea.fcreacion}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTarea.vigente ? "Vigente" : "Pending"}
              </div>

              <Link
                to={"/tareas/" + currentTarea.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Haga click sobre Tarea para seleccionar</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tareas: state.tareas,
  };
};

export default connect(mapStateToProps, {
  retrieveTareas,
  findTareasByDescripcion,
  deleteAllTareas,
})(TareasList);
