package io.gianhenrique.apibiblioteca.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.math.BigInteger;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "funcionario")
public class Funcionario {

    @Id
    @Column(name = "cpf")
    @NotEmpty(message = "CPF é obrigatório")
    @CPF
    String cpf;

    @Column(name = "nome")
    @NotEmpty(message = "Nome é obrigatório")
    String nome;

    @Column(name = "email")
    @NotEmpty(message = "Email é obrigatório")
    @Email
    String email;

    @Column(name = "telefone")
    @NotEmpty(message = "Telefone é obrigatório")
    String telefone;

}
