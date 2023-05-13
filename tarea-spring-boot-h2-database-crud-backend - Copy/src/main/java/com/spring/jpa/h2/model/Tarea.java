package com.spring.jpa.h2.model;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Data
@Entity
@Table(name = "tareas")
public class Tarea {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "descripcion")
	private String descripcion;

	@Temporal(TemporalType.DATE)
	@Column(name = "fcreacion")
	private Date fcreacion;

	@Column(name = "vigente")
	private boolean vigente;

	public Tarea() {

	}

	public Tarea(String descripcion, Date fcreacion, boolean vigente) {
		this.descripcion = descripcion;
		this.fcreacion = fcreacion;
		this.vigente = vigente;
	}

	public long getId() {
		return id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Date getFcreacion() {
		return fcreacion;
	}

	public void setFcreacion(Date fcreacion) {
		this.fcreacion = fcreacion;
	}

	public boolean isVigente() {
		return vigente;
	}

	public void setVigente(boolean isVigente) {
		this.vigente = isVigente;
	}

	@Override
	public String toString() {
		return "Tarea [id=" + id + ", descripcion=" + descripcion + ", fcreacion=" + fcreacion + ", vigente=" + vigente + "]";
	}

}
