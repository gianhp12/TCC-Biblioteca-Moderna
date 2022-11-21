package io.gianhenrique.apibiblioteca.repository;

import io.gianhenrique.apibiblioteca.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface FuncionariosRepository extends JpaRepository<Funcionario, String> {
}
