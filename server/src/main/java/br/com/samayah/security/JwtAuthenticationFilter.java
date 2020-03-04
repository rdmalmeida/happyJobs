package br.com.samayah.security;

import java.io.BufferedReader;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Data;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static AuthenticationManager authenticationManager;
    
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        JwtAuthenticationFilter.authenticationManager = authenticationManager;

        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }
   
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        
    	String userName = request.getParameter("username"); 
    	if(userName==null) {   			    			  
	    	
    		try {
	            BufferedReader reader = request.getReader();
	            StringBuffer sb = new StringBuffer();
	            String line = null;
	            while ((line = reader.readLine()) != null) {
	                sb.append(line);
	            }
	            String parsedReq = sb.toString();
	            if (parsedReq != null) {
	                ObjectMapper mapper = new ObjectMapper();
	                AuthReq authReq = mapper.readValue(parsedReq, AuthReq.class);
	                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword());
	                response.addHeader("access-control-expose-headers", "Authorization");
	                return authenticationManager.authenticate(authenticationToken);
	            }
	        } catch (Exception e) {
	            System.out.println(e.getMessage());
	            throw new InternalAuthenticationServiceException("Login ou Senha Inválidos");
	        }
	    	return null;
	    	
    	} else {
    		//apenas para testes no postman, depois remover
    		String password = request.getParameter("password");
        	UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userName, password);
         			  
         	return authenticationManager.authenticate(authenticationToken);
    	}
    	
    }

    @Data
    public static class AuthReq {
        String username;
        String password;
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain filterChain, Authentication authentication) {
    	UserDetails user = ((UserDetails) authentication.getPrincipal());

    	List<String> roles = user.getAuthorities()
	            .stream()
	            .map(GrantedAuthority::getAuthority)
	            .collect(Collectors.toList());

	        byte[] signingKey = SecurityConstants.JWT_SECRET.getBytes();

	        String token = Jwts.builder()
	            .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
	            .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
	            .setIssuer(SecurityConstants.TOKEN_ISSUER)
	            .setAudience(SecurityConstants.TOKEN_AUDIENCE)
	            .setSubject(user.getUsername())
	            .setExpiration(new Date(System.currentTimeMillis() + 7200000))
	            //.setExpiration(new Date(System.currentTimeMillis() + 1))
	            .claim("rol", roles)
	            .compact();

        response.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
    }
}
