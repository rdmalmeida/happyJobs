package br.com.samayah.happyJobs.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class Curriculum {
	
	@Id
	private String cpf;
	
	private String cvTitulo;
	
	private String cvDescricao;
	
	//List<ExperienciaProfissional> xpsLista;
	
	//List<OutraExperiencia> outrasXpsLista;
	
	@OneToMany(
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )
	@JoinColumn(name = "cpf")
	private List<Formacao> formacaoLista;
	
	//List<String> certificacoesLista;
	
}
