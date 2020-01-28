package br.com.samayah.infra;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
  
  @ExceptionHandler(BusinessException.class)
  public final ResponseEntity<Object> handleNotFoundException(BusinessException ex, WebRequest request) {

	  ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage(),
		        request.getDescription(false), HttpStatus.NOT_ACCEPTABLE.getReasonPhrase());
	  
    return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_ACCEPTABLE);
  }
  
  
  //InternalAuthenticationServiceException
  //org.springframework.security.authentication.DisabledException
  //UsernameNotFoundException
  //DisabledException
}
