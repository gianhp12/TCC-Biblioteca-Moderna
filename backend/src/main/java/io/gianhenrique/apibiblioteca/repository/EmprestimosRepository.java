package io.gianhenrique.apibiblioteca.repository;

import io.gianhenrique.apibiblioteca.entity.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimosRepository extends JpaRepository<Emprestimo, Integer> {
}
