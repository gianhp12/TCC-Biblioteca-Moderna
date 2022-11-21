package io.gianhenrique.apibiblioteca.service.impl;


import io.gianhenrique.apibiblioteca.entity.Emprestimo;
import io.gianhenrique.apibiblioteca.repository.EmprestimosRepository;
import io.gianhenrique.apibiblioteca.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class EmprestimoImpl implements EmprestimoService {
    @Autowired
    EmprestimosRepository repository;


    public List<Emprestimo> getAll(){
        return repository.findAll();
    }



    public Emprestimo save(Emprestimo emprestimo){
        return
                repository.save(emprestimo);
    }


    public void delete(Integer id){
        repository.findById(id)
                .map(idEmprestimo -> {
                    repository.delete(idEmprestimo);
                    return idEmprestimo;
                })
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Emprestimo não encontrado"));
    }
}
