package io.gianhenrique.apibiblioteca.repository;

import io.gianhenrique.apibiblioteca.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface LivrosRepository extends JpaRepository<Livro, String> {
    @Query(value = " select * from livro c where c.nome like '%:titulo%' ", nativeQuery = true)
    Livro findByName(@Param("nome") String nome );

}
