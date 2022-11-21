package io.gianhenrique.apibiblioteca.controller;

import io.gianhenrique.apibiblioteca.entity.Aluno;
import io.gianhenrique.apibiblioteca.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;


@RestController
@RequestMapping("/api/alunos/")

    public class AlunoController {

    @Autowired
    AlunoService service;

    @GetMapping("/consultar/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public List<Aluno> getAlunoById(@PathVariable BigInteger cpf){
        return service.getAlunoById(cpf);
    }

    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Aluno save(@RequestBody @Valid Aluno aluno){
        return service.save(aluno);
    }

    @DeleteMapping("/apagar/{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable BigInteger cpf){
        service.delete(cpf);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Aluno> getAll(){
        return service.getAll();
    }


}


