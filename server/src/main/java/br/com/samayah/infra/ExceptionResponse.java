package br.com.samayah.infra;

import java.util.Date;

import lombok.Data;
import lombok.NonNull;

@Data
public class ExceptionResponse {
	
	  @NonNull
	  private Date timestamp;
	  @NonNull
	  private String mensagem;
	  @NonNull
	  private String detalhes;
	  @NonNull
	  private String httpCodeMessage;
	 
	}
