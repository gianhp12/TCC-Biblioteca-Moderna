package io.gianhenrique.apibiblioteca.service.impl;

import io.gianhenrique.apibiblioteca.entity.Livro;
import io.gianhenrique.apibiblioteca.repository.LivrosRepository;
import io.gianhenrique.apibiblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LivroImpl implements LivroService {
    @Autowired
    LivrosRepository repository;

    public List<Livro> getLivroByName(String nome){
        Livro livro = repository
                .findByName(nome);
        return Collections.singletonList(livro);
    }

    public List<Livro> getAllLivros(){
        return repository
                .findAll();
    }


    public Livro save( Livro livro){
        return repository.save(livro);
    }



    public void delete(Integer codigo){
        repository.findById(String.valueOf(codigo))
                .map(livro -> {
                    repository.delete(livro);
                    return livro;
                })
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Livro não encontrado"));
    }
}
