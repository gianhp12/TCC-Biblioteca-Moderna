package io.gianhenrique.apibiblioteca.service;

import io.gianhenrique.apibiblioteca.entity.Funcionario;

import java.math.BigInteger;
import java.util.List;


public interface FuncionarioService {
    public Funcionario getFuncionarioById(BigInteger cpf );

    public Funcionario save( Funcionario funcionario);

    public List<Funcionario> getAllFuncionarios();

    public void delete(BigInteger cpf);
}