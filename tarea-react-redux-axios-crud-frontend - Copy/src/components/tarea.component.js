import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTarea, deleteTarea } from "../actions/tareas";
import TareaDataService from "../services/tarea.service";

class Tarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeFcreacion = this.onChangeFcreacion.bind(this);
    this.getTarea = this.getTarea.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTarea = this.removeTarea.bind(this);

    this.state = {
      currentTarea: {
        id: null,
        descripcion: "",
        fcreacion: "",
        vigente: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTarea(this.props.match.params.id);
  }

  onChangeDescripcion(e) {
    const descripcion = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTarea: {
          ...prevState.currentTarea,
          descripcion: descripcion,
        },
      };
    });
  }

  onChangeFcreacion(e) {
    const fcreacion = e.target.value;

    this.setState((prevState) => ({
      currentTarea: {
        ...prevState.currentTarea,
        fcreacion: fcreacion,
      },
    }));
  }

  getTarea(id) {
    TareaDataService.get(id)
      .then((response) => {
        this.setState({
          currentTarea: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTarea.id,
      descripcion: this.state.currentTarea.descripcion,
      fcreacion: this.state.currentTarea.fcreacion,
      vigente: status,
    };
    console.log("ssssssss");
    this.props
      .updateTarea(this.state.currentTarea.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentTarea: {
            ...prevState.currentTarea,
            vigente: status,
          },
        }));

        this.setState({ message: "Estado a sido actualizado con exito!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
  console.log("eeeeee");
    this.props
      .updateTarea(this.state.currentTarea.id, this.state.currentTarea)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "La tarea fue actualizada con exito!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeTarea() {
    this.props
      .deleteTarea(this.state.currentTarea.id)
      .then(() => {
        this.props.history.push("/tareas");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTarea } = this.state;

    return (
      <div>
        {currentTarea ? (
          <div className="edit-form">
            <h4>Tarea</h4>
            <form>
              <div className="form-group">
                <label htmlFor="descripcion">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={currentTarea.descripcion}
                  onChange={this.onChangeDescripcion}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fcreacion">Fcreacion</label>
                <input
                  type="date"
                  className="form-control"
                  id="fcreacion"
                  value={currentTarea.fcreacion}
                  onChange={this.onChangeFcreacion}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTarea.vigente ? "Vigente" : "NO Vigente"}
              </div>
            </form>

            {currentTarea.vigente ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                NO Vigente
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Vigente
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTarea}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tarea...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateTarea, deleteTarea })(Tarea);
