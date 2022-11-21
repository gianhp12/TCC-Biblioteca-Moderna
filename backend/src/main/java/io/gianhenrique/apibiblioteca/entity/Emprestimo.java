package io.gianhenrique.apibiblioteca.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "emprestimo")
public class Emprestimo {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "aluno")
    @NotEmpty(message = "Aluno é obrigatório")
    String aluno;

    @Column(name = "livro")
    @NotEmpty(message = "Livro é obrigatório")
    String livro;

    @Column(name = "dataEmprestimo")
    @NotEmpty(message = "Data de emprestimo é obrigatório")
    String dataEmprestimo;

    @Column(name = "dataDevolucao")
    @NotEmpty(message = "Data de devolução é obrigatória")
    String dataDevolucao;
}
