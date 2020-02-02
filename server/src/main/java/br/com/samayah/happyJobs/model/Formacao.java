package br.com.samayah.happyJobs.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

//@Entity
@Data
@NoArgsConstructor
public class Formacao {
		
	@EmbeddedId
	private FormacaoPK id;
	
	private String escola;
	
	private Date dtInicio;
	
	private Date dtFim;
	
	private String areaDeEstudo;
	
	private String descricao;
	
	//@Embeddable
	@Data
	private class FormacaoPK implements Serializable {

		private static final long serialVersionUID = -7946944271216052892L;

		private long id;
		
		private String cpf;	
	}

}
