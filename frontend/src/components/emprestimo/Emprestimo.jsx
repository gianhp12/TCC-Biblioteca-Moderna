import React from 'react'
import Main from '../template/main'


import axios from 'axios'

const headerProps = {
    icon: 'user',
    title: 'Emprestimo',
    subtitle: 'Cadastro de Empréstimo'
}

const baseUrlEmprestimo = 'http://localhost:8085/api/emprestimo/';
const baseUrlAlunos = 'http://localhost:8085/api/alunos/';
const baseUrlLivros = 'http://localhost:8085/api/livros/consultar/todos';
const baseUrlPostEmprestimo = 'http://localhost:8085/api/emprestimo/cadastrar';
const baseUrlDeleteEmprestimo = 'http://localhost:8085/api/emprestimo/apagar/';

const initState= {
    emprestimo: { id:'', aluno:'', livro:'', dataEmprestimo: '', dataDevolucao: ''},
    list: [], 
    lista: [],
    listalivros: [],
}


export default class Emprestimo extends React.Component {
    
    state = { ...initState }
    


    componentWillMount() {
        axios.get(baseUrlEmprestimo,baseUrlPostEmprestimo,baseUrlDeleteEmprestimo,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ list: resp.data })/**salvamos dentro da lista as requisições */
        })   

        axios.get(baseUrlAlunos,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ lista: resp.data })/**salvamos dentro da lista as requisições */
        })  

        axios.get(baseUrlLivros,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ listalivros: resp.data })/**salvamos dentro da lista as requisições */
        })  
             
    }
    
     /*Limpar formulario */
     clear() {
        this.setState({ emprestimo: initState.emprestimo })
    }

    save() {
        const emprestimo = this.state.emprestimo 
        const method = emprestimo.id ? 'put' : 'post'
        const url = emprestimo.id ? `${baseUrlPostEmprestimo}/${emprestimo.id}` : baseUrlPostEmprestimo
        var config = {
            headers: {crossdomain: true}
        };
        axios[method](url,emprestimo,config)
        .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ emprestimo: initState.emprestimo, list })  
            alert("Salvo com sucesso")         
        })
        .catch(error => {
            const { data } = error.response;
            var errors = '';
            for (var i = 0; i < data.errors.length; i++) {
                errors = errors + '\n' + data.errors[i].defaultMessage;
               
             }
            alert(errors);
            if(data.status === 400){
                alert("Verifique as informações de cadastro e tente novamente")
            }
            else{
                alert("Erro interno no servidor, tente novamente.")
            }
            
        })
    }

    getUpdatedList(emprestimo){       
        const list = this.state.list.filter(e => e.id !== emprestimo.id) /**removendo o usuario da lista */
        list.unshift(emprestimo) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const emprestimo = { ...this.state.emprestimo}
        emprestimo[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ emprestimo })
    }


    renderForm(){
        /**jsx que ira renderizar o formulário */
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                    <div className="form-group">
                        <h6>Selecione o Aluno</h6>
                        <select className="form-select form-select-lg mb-3" id='selectAluno' aria-label=".form-select-lg example" name="aluno" onChange={e => this.updatefield(e)} value={this.state.emprestimo.aluno} >
                        <option></option>
                        {this.renderOptionAluno()}
                       
                        </select>
                        </div>
                    
                        <div className="form-group">
                        <h6>Selecione o Livro</h6>
                        <select className="form-select form-select-lg mb-3" id='selectLivro' aria-label=".form-select-lg example" name="livro" onChange={e => this.updatefield(e)} value={this.state.emprestimo.livro}>
                        <option></option>
                        {this.renderOptionLivro()}
                        
                        </select>
                        </div>


                        <div className="form-group">
                            <label for="dataEmprestimo">Data de Empréstimo</label>
                            <div class="invalid-feedback" data-sb-feedback="dataEmprestimo:required">A data é obrigatória</div>
                            <input type="date" className="form-control" 
                                name="dataEmprestimo" 
                                value={this.state.emprestimo.dataEmprestimo}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a data de empréstimo.."
                                data-sb-validations="required"
                                />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Data de Devolução</label>
                            <input type="date" className="form-control" 
                                name="dataDevolucao" 
                                value={this.state.emprestimo.dataDevolucao}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a data de devolução.."
                                />
                        </div>
                    </div>
                    
                </div>
                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>

            </div>
        );
    }
  

    /**edição */
    load(emprestimo){
        this.setState({ emprestimo })/**atualiza o estado da aplicação. */
    }

    remove(emprestimo){
        axios.delete(`${baseUrlDeleteEmprestimo}${emprestimo.id}`)
        .then(resp => {
            const list = this.state.list.filter(e => e !== emprestimo)
            this.setState({ list })
        })
    }

    /**list users */
    rendertable(){
        return(
            <table className="table mt-4">
               <thead>
                    <tr>
                        <th>ID</th>
                        <th>Aluno</th>
                        <th>Livro</th>
                        <th>Data Empréstimo</th>
                        <th>Data Devolução</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderows()}
                </tbody>            
            </table>
        );
    }

    renderows(){
        /**mapeando usuários que estão no estado do objeto */
        return this.state.list.map((emprestimo) => {
            return (                
                <tr key={emprestimo.id}>
                    <td>{emprestimo.id}</td>
                    <td>{emprestimo.aluno}</td>
                    <td>{emprestimo.livro}</td>
                    <td>{emprestimo.dataEmprestimo}</td>
                    <td>{emprestimo.dataDevolucao}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(emprestimo)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(emprestimo)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    renderOptionAluno(){
        return this.state.lista.map((aluno) => {
            return (
                    <option key={aluno.cpf} value={aluno.nome}>{aluno.nome}</option>
            );
        })}

        renderOptionLivro(){
            return this.state.listalivros.map((livro) => {
                return (
                        <option key={livro.codigo} value={livro.titulo}>{livro.titulo}</option>
                );
            })}

      

    render(){        
        return(            
            <Main {...headerProps}>
                
                {this.renderForm()}
                {this.rendertable()}

            </Main>
        );
    }

    


}

