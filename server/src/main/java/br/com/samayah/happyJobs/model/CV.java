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
	private String cvTitulo;
	
	@NonNull
	private String cvDescricao;
	
	//List<ExperienciaProfissional> xpsLista;
	
	//List<OutraExperiencia> outrasXpsLista;
	
	/*
	 * @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true )
	 * 
	 * @JoinColumn(name = "cpf") private List<Formacao> formacaoLista;
	 */
	
	//List<String> certificacoesLista;
	
}
