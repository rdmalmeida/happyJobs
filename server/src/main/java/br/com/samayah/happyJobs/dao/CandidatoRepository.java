package br.com.samayah.happyJobs.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import br.com.samayah.happyJobs.model.Candidato;


public interface CandidatoRepository extends CrudRepository<Candidato, String> {

	
	@SuppressWarnings("unchecked")
	@Transactional(isolation = Isolation.DEFAULT)
	@Override
	Candidato save(Candidato dados);
	
	/*
	 * @Override Candidato findById(Candidato dados);
	 */		    
}
