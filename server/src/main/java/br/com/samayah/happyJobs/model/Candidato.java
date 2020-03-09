package br.com.samayah.happyJobs.model;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Candidato {
	
	@Id
	private String username;

	@Embedded
	private DadosPessoais dadosPessoais;
			
	@Embedded 
	private CV cv;
		

}
