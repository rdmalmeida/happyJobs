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
public class ExperienciaProfissional {
	
	@Id @GeneratedValue
	private Long id;

	@NonNull
	private String username;
	
	@NonNull
	private String titulo;
	
	@NonNull
	private String empresa;
	
	@NonNull
	private String descricao;

	@NonNull
	private String mesInicio;
	
	@NonNull
	private String mesFim;
	
	@NonNull
	private String anoInicio;
	
	@NonNull
	private String anoFim;
	
	@NonNull
	private String cidade;
	
	@NonNull
	private String pais;

}
