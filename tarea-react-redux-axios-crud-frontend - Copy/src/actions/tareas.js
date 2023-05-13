import {
  CREATE_TAREA,
  RETRIEVE_TAREAS,
  UPDATE_TAREA,
  DELETE_TAREA,
  DELETE_ALL_TAREAS
} from "./types";

import TareaDataService from "../services/tarea.service";

export const createTarea = (descripcion, fcreacion) => async (dispatch) => {
  try {
    const res = await TareaDataService.create({ descripcion, fcreacion });

    dispatch({
      type: CREATE_TAREA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTareas = () => async (dispatch) => {
  try {
    const res = await TareaDataService.getAll();

    dispatch({
      type: RETRIEVE_TAREAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTarea = (id, data) => async (dispatch) => {
  try {
    console.log("data: " + data);
    const res = await TareaDataService.update(id, data);
console.log("res: " + res);
    dispatch({
      type: UPDATE_TAREA,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTarea = (id) => async (dispatch) => {
  try {
    await TareaDataService.delete(id);

    dispatch({
      type: DELETE_TAREA,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTareas = () => async (dispatch) => {
  try {
    const res = await TareaDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_TAREAS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findTareasByDescripcion = (descripcion) => async (dispatch) => {
  try {
    const res = await TareaDataService.findByDescripcion(descripcion);

    dispatch({
      type: RETRIEVE_TAREAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};