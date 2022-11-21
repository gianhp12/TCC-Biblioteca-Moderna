package io.gianhenrique.apibiblioteca.repository;

import io.gianhenrique.apibiblioteca.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigInteger;

public interface AlunosRepository extends JpaRepository<Aluno, String> {
}
