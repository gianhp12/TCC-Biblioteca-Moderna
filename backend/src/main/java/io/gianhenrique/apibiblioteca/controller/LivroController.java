package io.gianhenrique.apibiblioteca.controller;

import io.gianhenrique.apibiblioteca.entity.Livro;
import io.gianhenrique.apibiblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;


@RestController
@RequestMapping("/api/livros")
public class LivroController {
    @Autowired
    LivroService service;
    @GetMapping("/consultar/{codigo}")
    @ResponseStatus(HttpStatus.OK)
    public List<Livro> getLivroByNome(String nome){
        return service.getLivroByName(nome);
    }

    @GetMapping("/consultar/todos")
    @ResponseStatus(HttpStatus.OK)
    public List<Livro> getAllLivros(){
       return service.getAllLivros();
    }

    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Livro save(@RequestBody @Valid Livro livro){
        return service.save(livro);
    }

    @DeleteMapping("/apagar/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer codigo){
        service.delete(codigo);
    }

}