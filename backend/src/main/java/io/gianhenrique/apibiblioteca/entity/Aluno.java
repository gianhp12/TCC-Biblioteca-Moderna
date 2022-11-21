package io.gianhenrique.apibiblioteca.entity;

import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import java.math.BigInteger;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aluno")
public class Aluno {

    @Id
    @Column(name = "cpf")
    @NotEmpty(message = "CPF é obrigátorio")
    @CPF
    String cpf;

    @Column(name = "nome")
    @NotEmpty(message = "Nome é obrigátorio")
    String nome;

    @Column(name = "email")
    @NotEmpty(message = "Email é obrigátorio")
    @Email
    String email;

    @Column(name = "telefone")
    @NotEmpty(message = "Telefone é obrigátorio")
    String telefone;

}
