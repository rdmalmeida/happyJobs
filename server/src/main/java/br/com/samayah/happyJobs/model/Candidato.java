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

	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "username", unique = true)
	 */
	@Embedded
	private DadosPessoais dadosPessoais;
	
	/*
	 * @OneToOne
	 * 
	 * @JoinColumn(name = "username") private Users user;
	 */
		
	@Embedded 
	private CV cv;
	
		

}
