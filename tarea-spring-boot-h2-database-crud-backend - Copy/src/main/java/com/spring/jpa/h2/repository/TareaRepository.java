package com.spring.jpa.h2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.jpa.h2.model.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
  List<Tarea> findByVigente(boolean vigente);

  List<Tarea> findByDescripcionContaining(String descripcion);
}
