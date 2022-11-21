package io.gianhenrique.apibiblioteca.controller;

import io.gianhenrique.apibiblioteca.entity.Funcionario;
import io.gianhenrique.apibiblioteca.entity.Livro;
import io.gianhenrique.apibiblioteca.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    @Autowired
    FuncionarioService service;
    @GetMapping("/consultar/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public Funcionario getFuncionarioById(BigInteger cpf ){
        return service.getFuncionarioById(cpf);
    }

    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Funcionario save(@RequestBody @Valid Funcionario funcionario){
        return service.save(funcionario);
    }

    @GetMapping("/consultar/todos")
    @ResponseStatus(HttpStatus.OK)
    public List<Funcionario> getAllLivros(){
        return service.getAllFuncionarios();
    }

    @DeleteMapping("/apagar/{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable BigInteger cpf){
        service.delete(cpf);
    }
}