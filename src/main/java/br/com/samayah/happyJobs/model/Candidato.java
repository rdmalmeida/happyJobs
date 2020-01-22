package br.com.samayah.happyJobs.model;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Candidato {
	
	@Id
	private String cpf;
	
	private String nome;
	
	@OneToOne
	@JoinColumn(name = "username")
	private Users user;
	
	@Embedded
	private Curriculum cv;
		

}
