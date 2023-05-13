import http from "../http-common";

class TareaDataService {
  getAll() {
    return http.get("/tareas");
  }

  get(id) {
    return http.get(`/tareas/${id}`);
  }

  create(data) {
    return http.post("/tareas", data);
  }

  update(id, data) {
    return http.put(`/tareas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tareas/${id}`);
  }

  deleteAll() {
    return http.delete(`/tareas`);
  }

  findByDescripcion(descripcion) {
    return http.get(`/tareas?descripcion=${descripcion}`);
  }
}

export default new TareaDataService();