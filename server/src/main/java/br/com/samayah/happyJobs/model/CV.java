package br.com.samayah.happyJobs.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


@Data
@NoArgsConstructor
public class CV {
	
	@NonNull
	private String titulo;
	
	@NonNull
	private String resumo;
		
	@OneToMany( cascade = CascadeType.ALL )
	@JoinColumn(name = "username")
	private List<Formacao> formacao;

	@OneToMany( cascade = CascadeType.ALL )
	@JoinColumn(name = "username")
	private List<ExperienciaProfissional> xpProf;
	
	//List<OutraExperiencia> outrasXpsLista;
	
	//List<String> certificacoesLista;
}
