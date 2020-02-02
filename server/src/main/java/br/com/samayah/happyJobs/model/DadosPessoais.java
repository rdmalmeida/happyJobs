package br.com.samayah.happyJobs.model;

import javax.persistence.Embeddable;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class DadosPessoais {

	private String foto;
	private String nomeCompleto;
	private String nascimento;
	private String rg;
	private String cpf;
	private String nacionalidade;
	private String naturalidade;
	private String estadoCivil; // solteiro, casado, divorciado, união estável
	private String genero; // M F

	private Boolean possuiFilhos;
	private Boolean possuiHabilitacao;
	private Boolean possuiVeiculo;
	private Boolean possuiNecessidadesEspeciais;
	private Boolean disponibilidadeMudar;
	
	private String pretensaoSalarial;

	private String linkFace;
	private String linkedIn;
	private String instagram;
	
	private String logradouro;
	private String bairro;
	private String cidade;
	private String uf;
	private String cep;
	private String complemento; // opcional/ 
	
}
