package io.gianhenrique.apibiblioteca.service;

import io.gianhenrique.apibiblioteca.entity.Livro;

import java.util.List;

public interface LivroService {
    public List<Livro> getLivroByName(String nome);

    public List<Livro> getAllLivros();

    public Livro save( Livro livro);

    public void delete(Integer codigo);

}
