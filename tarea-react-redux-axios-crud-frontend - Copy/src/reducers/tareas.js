import {
  CREATE_TAREA,
  RETRIEVE_TAREAS,
  UPDATE_TAREA,
  DELETE_TAREA,
  DELETE_ALL_TAREAS,
} from "../actions/types";

const initialState = [];

function tareaReducer(tareas = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TAREA:
      return [...tareas, payload];

    case RETRIEVE_TAREAS:
      return payload;

    case UPDATE_TAREA:
      return tareas.map((tarea) => {
        if (tarea.id === payload.id) {
          return {
            ...tarea,
            ...payload,
          };
        } else {
          return tarea;
        }
      });

    case DELETE_TAREA:
      return tareas.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_TAREAS:
      return [];

    default:
      return tareas;
  }
};

export default tareaReducer;