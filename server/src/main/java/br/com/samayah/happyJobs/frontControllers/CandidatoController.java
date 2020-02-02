package br.com.samayah.happyJobs.frontControllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.samayah.happyJobs.dao.CandidatoRepository;
import br.com.samayah.happyJobs.model.Candidato;
import br.com.samayah.infra.BusinessException;

@RestController
@RequestMapping("/api/v1")
public class CandidatoController {
	
	@Autowired
    private CandidatoRepository dpRepository;
	

	@RequestMapping(value = "candidato", method = RequestMethod.POST)
	public Candidato saveCandidato(@RequestBody Candidato candidato) throws BusinessException {
		
		System.out.println("candidato::" + candidato);
		dpRepository.save(candidato);
				
		return candidato;
    }
	
	@RequestMapping(value = "candidato", method = RequestMethod.GET)
	public Candidato getCandidato(@RequestParam(name = "username") String username) throws BusinessException {
		
		Optional<Candidato> c = dpRepository.findById(username);			
		System.out.println("candidato::" + c.get());
		return c.get();
    }
	
}
