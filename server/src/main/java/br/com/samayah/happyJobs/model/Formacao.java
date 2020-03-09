package br.com.samayah.happyJobs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Formacao {

	@Id @GeneratedValue
	private Long id;

	private String username;
	
	@NonNull
	private String escola;
	
	@NonNull
	private String anoInicio;
	
	@NonNull
	private String anoFim;
	
	@NonNull
	private String descricao;
	
	@NonNull
	private String grau;
	
	private String areaDeEstudo;

}
