package br.com.samayah.frontControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.samayah.infra.BusinessException;
import br.com.samayah.model.Users;

@RestController
@RequestMapping("api/v1/")
public class LoginController {

	@Autowired
	private br.com.samayah.service.MyUserDetailsService muds;
	
	@RequestMapping(value = "users", method = RequestMethod.POST)
	public Users saveUser(@RequestBody Users user) throws BusinessException {
		
		muds.save(user);        
        
		user.setPassword("");
		return user;
    }
	
	//nunca usar em producao :)
	
	/*
	 * @RequestMapping(value = "users", method = RequestMethod.GET) public Users
	 * loadUser(){ MyUserPrincipal ud =
	 * (MyUserPrincipal)muds.loadUserByUsername("raphael"); return ud.getUser(); }
	 */
	 
}
