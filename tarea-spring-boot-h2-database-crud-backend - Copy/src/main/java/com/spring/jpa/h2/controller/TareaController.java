package com.spring.jpa.h2.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spring.jpa.h2.model.Tarea;
import com.spring.jpa.h2.repository.TareaRepository;

//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
@CrossOrigin(maxAge = 3600)
public class TareaController {

	@Autowired
	TareaRepository tareaRepository;

	@GetMapping("/tareas")
	public ResponseEntity<List<Tarea>> getAllTareas(@RequestParam(required = false) String descripcion) {
		try {
			List<Tarea> tareas = new ArrayList<Tarea>();

			if (descripcion == null)
				tareaRepository.findAll().forEach(tareas::add);
			else
				tareaRepository.findByDescripcionContaining(descripcion).forEach(tareas::add);

			if (tareas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(tareas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/tareas/{id}")
	public ResponseEntity<Tarea> getTareaById(@PathVariable("id") long id) {
		Optional<Tarea> tareaData = tareaRepository.findById(id);

		if (tareaData.isPresent()) {
			return new ResponseEntity<>(tareaData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/tareas")
	public ResponseEntity<Tarea> createTarea(@RequestBody Tarea tarea) {
		try {
			Tarea _tarea = tareaRepository
					.save(new Tarea(tarea.getDescripcion(), tarea.getFcreacion(), false));
			return new ResponseEntity<>(_tarea, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/tareas/{id}")
	public ResponseEntity<Tarea> updateTarea(@PathVariable("id") long id, @RequestBody Tarea tarea) {
		Optional<Tarea> tareaData = tareaRepository.findById(id);

		if (tareaData.isPresent()) {
			Tarea _tarea = tareaData.get();
			_tarea.setDescripcion(tarea.getDescripcion());
			_tarea.setFcreacion(tarea.getFcreacion());
			_tarea.setVigente(tarea.isVigente());
			return new ResponseEntity<>(tareaRepository.save(_tarea), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/tareas/{id}")
	public ResponseEntity<HttpStatus> deleteTarea(@PathVariable("id") long id) {
		try {
			tareaRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/tareas")
	public ResponseEntity<HttpStatus> deleteAllTareas() {
		try {
			tareaRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/tareas/vigente")
	public ResponseEntity<List<Tarea>> findByVigente() {
		try {
			List<Tarea> tareas = tareaRepository.findByVigente(true);

			if (tareas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(tareas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
