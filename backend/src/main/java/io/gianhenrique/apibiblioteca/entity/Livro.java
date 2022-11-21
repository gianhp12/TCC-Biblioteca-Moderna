package io.gianhenrique.apibiblioteca.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "livro")
public class Livro {

    @Id
    @Column(name = "codigo")
    @NotEmpty(message = "Código é obrigatório")
    String codigo;

    @Column(name = "titulo")
    @NotEmpty(message = "Titulo é obrigatório")
    String titulo;

    @Column(name = "autor")
    @NotEmpty(message = "Autor é obrigatório")
    String autor;

    @Column(name = "datacompra")
    @NotEmpty(message = "Data da compra é obrigatório")
    String datacompra;

}
