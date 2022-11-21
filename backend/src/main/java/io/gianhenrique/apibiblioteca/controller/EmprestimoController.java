package io.gianhenrique.apibiblioteca.controller;

import io.gianhenrique.apibiblioteca.entity.Emprestimo;
import io.gianhenrique.apibiblioteca.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/emprestimo")
public class EmprestimoController {
    @Autowired
    EmprestimoService service;

    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Emprestimo save(@RequestBody @Valid Emprestimo emprestimo){
        return service.save(emprestimo);
    }

    @DeleteMapping("/apagar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id){
        service.delete(id);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Emprestimo> getAll(){
        return service.getAll();
    }
}
