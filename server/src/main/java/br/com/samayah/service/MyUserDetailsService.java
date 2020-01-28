package br.com.samayah.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.samayah.dao.UserRepository;
import br.com.samayah.infra.BusinessException;
import br.com.samayah.model.MyUserPrincipal;
import br.com.samayah.model.Users;
import br.com.samayah.security.JwtAuthorizationFilter;
import br.com.samayah.security.SecurityConfiguration;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class MyUserDetailsService implements UserDetailsService {
 
    @Autowired
    private UserRepository userRepository;
 	
    @Override
    public UserDetails loadUserByUsername(String username) {
    	
        Users user = findUserByName(username);
    	//User user = new User(username, passwordEncoder().encode("password"));
        if (user==null) {
            throw new UsernameNotFoundException(username);
        }
    	
        return new MyUserPrincipal(user);
    }
    
    public Users findUserByName(String name) {
    	return userRepository.findByUsername(name);
    }
    
    public Users save(Users user, String token) throws BusinessException {
    	
    	if(!isUserValido(user, token)) {
			throw new ResponseStatusException(
			           HttpStatus.UNAUTHORIZED, "Voce nao pode modificar dados de outro usuario");
		}
		
		return save(user);
    }
    
    public Users save(Users user) throws BusinessException {
    	
    	if(this.userRepository.findByUsername(user.getUsername())!=null) {
    		throw new BusinessException("Usuario já existente.");
    	}
    	
    	String encryptedPass = SecurityConfiguration.passwordEncoder().encode(user.getPassword());
		user.setPassword(encryptedPass);
    	log.warn("Salvando usuario: " + user);		
		
    	return this.userRepository.save(user);
    }
    
    public boolean isUserValido(Users user, String token){
		
    	String extractedUsername = JwtAuthorizationFilter.getParsedToken(token)
                .getBody()
                .getSubject();
		
		return user.getUsername().equals(extractedUsername);
    }
    
	
}
