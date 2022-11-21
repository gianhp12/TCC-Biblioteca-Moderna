package io.gianhenrique.apibiblioteca.service;


import io.gianhenrique.apibiblioteca.entity.Emprestimo;
import java.util.List;

public interface EmprestimoService {
    public List<Emprestimo> getAll();

    public Emprestimo save(Emprestimo emprestimo);

    public void delete(Integer id);
}


