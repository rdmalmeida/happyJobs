package br.com.samayah.infra;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

@Data 
@EqualsAndHashCode(callSuper = false)
public class BusinessException extends Exception {

	private static final long serialVersionUID = -1703407560441026366L;
	
	@NonNull
	private String message; 
	
}
