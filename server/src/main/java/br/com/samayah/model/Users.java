package br.com.samayah.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import br.com.samayah.happyJobs.model.Candidato;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Users {

	@Id
	@NonNull
	private String username;

	@NonNull
	private String password;

	@NonNull
	private Boolean enabled;

	@NonNull
	private Date dataCadastro;

	
	/*
	 * @OneToOne(mappedBy="user", fetch = FetchType.LAZY) private Candidato
	 * candidato;
	 */


}