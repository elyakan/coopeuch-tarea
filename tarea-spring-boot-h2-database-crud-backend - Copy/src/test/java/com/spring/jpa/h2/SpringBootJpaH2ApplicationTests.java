package com.spring.jpa.h2;

import com.spring.jpa.h2.repository.TareaRepository;
import com.spring.jpa.h2.model.Tarea;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
class SpringBootJpaH2ApplicationTests {

	@Autowired
	TareaRepository tareaRepository;

	@Test
	void testFindByDescripcionContaining() {
		List<Tarea> findByDescripcionContaining = tareaRepository.findByDescripcionContaining("sssss");
		assertEquals(1, findByDescripcionContaining.size());
	}

	@Test
	void testFindByVigente() {
		List<Tarea> findByVigente = tareaRepository.findByVigente(true);
		assertEquals(1, findByVigente.size());
	}



}
