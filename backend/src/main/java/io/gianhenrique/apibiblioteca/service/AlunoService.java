package io.gianhenrique.apibiblioteca.service;

import io.gianhenrique.apibiblioteca.entity.Aluno;
import java.math.BigInteger;
import java.util.List;

public interface AlunoService {
    public List<Aluno> getAlunoById(BigInteger cpf);

    public Aluno save(Aluno aluno);

    public void delete(BigInteger cpf);

    public List<Aluno> getAll();

}