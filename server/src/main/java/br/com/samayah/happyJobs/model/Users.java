package br.com.samayah.happyJobs.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
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
    private String email;
	
	@NonNull
	private Date dataCadastro;
	
	@OneToOne(mappedBy="user")
	private Candidato candidato;

}