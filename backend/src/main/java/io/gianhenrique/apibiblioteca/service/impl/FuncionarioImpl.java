package io.gianhenrique.apibiblioteca.service.impl;

import io.gianhenrique.apibiblioteca.entity.Funcionario;
import io.gianhenrique.apibiblioteca.repository.FuncionariosRepository;
import io.gianhenrique.apibiblioteca.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.util.List;

@Service
@Transactional
public class FuncionarioImpl implements FuncionarioService {
    @Autowired
    FuncionariosRepository repository;

    public Funcionario getFuncionarioById(BigInteger cpf ){
        return repository
                .findById(String.valueOf(cpf))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Funcionario não encontrado"));
    }


    public Funcionario save( Funcionario funcionario){
        return repository.save(funcionario);
    }


    public List<Funcionario> getAllFuncionarios(){
        return repository.findAll();
    }

    public void delete(BigInteger cpf){
        repository.findById(String.valueOf(cpf))
                .map(funcionario -> {
                    repository.delete(funcionario);
                    return funcionario;
                })
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Funcionario não encontrado"));
    }

}
