package br.com.samayah.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.samayah.model.Users;


public interface UserRepository extends JpaRepository<Users, String> {
	
	    Users findByUsername(String username);
	    
	    @SuppressWarnings("unchecked")
		Users save(Users u);
	    
}
