import React, { Component } from "react";
import { connect } from "react-redux";
import { createTarea } from "../actions/tareas";

class AddTarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeFcreacion = this.onChangeFcreacion.bind(this);
    this.saveTarea = this.saveTarea.bind(this);
    this.newTarea = this.newTarea.bind(this);

    this.state = {
      id: null,
      descripcion: "",
      fcreacion: "",
      vigente: false,

      submitted: false,
    };
  }

  onChangeDescripcion(e) {
    this.setState({
      descripcion: e.target.value,
    });
  }

  onChangeFcreacion(e) {
    this.setState({
      fcreacion: e.target.value,
    });
  }

  saveTarea() {

    const { descripcion, fcreacion } = this.state;

    if(descripcion===''){
        alert('error: descripcion no puede ser vacio');
        return;
    }

    this.props
      .createTarea(descripcion, fcreacion)
      .then((data) => {
        this.setState({
          id: data.id,
          descripcion: data.descripcion,
          fcreacion: data.fcreacion,
          vigente: data.vigente,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTarea() {
    this.setState({
      id: null,
      descripcion: "",
      fcreacion: "",
      vigente: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
                <div>
                    <h4>Grabado con exito!</h4>
                    <button className="btn btn-success" onClick={this.newTarea}>
                      Agregar
                    </button>
                  </div>

        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={this.state.descripcion}
                onChange={this.onChangeDescripcion}
                name="descripcion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fcreacion">Fcreacion</label>
              <input
                type="date"
                className="form-control"
                id="fcreacion"
                required
                value={this.state.fcreacion}
                onChange={this.onChangeFcreacion}
                name="fcreacion"
              />
            </div>

            <button onClick={this.saveTarea} className="btn btn-success">
              Grabar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createTarea })(AddTarea);
