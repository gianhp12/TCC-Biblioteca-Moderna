package io.gianhenrique.apibiblioteca.service.impl;

import io.gianhenrique.apibiblioteca.entity.Aluno;
import io.gianhenrique.apibiblioteca.repository.AlunosRepository;
import io.gianhenrique.apibiblioteca.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class AlunoImpl implements AlunoService {
    @Autowired
    AlunosRepository repository;


    public List<Aluno> getAlunoById(BigInteger cpf) {
        Aluno aluno = repository
                .findById(String.valueOf(cpf))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));
        return Collections.singletonList(aluno);
    }

    public List<Aluno> getAll(){
        return repository.findAll();
    }



    public Aluno save(Aluno aluno){
        return
                repository.save(aluno);
    }



    public void delete(BigInteger cpf){
        repository.findById(String.valueOf(cpf))
                .map(aluno -> {
                    repository.delete(aluno);
                    return aluno;
                })
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente não encontrado"));
    }
}


