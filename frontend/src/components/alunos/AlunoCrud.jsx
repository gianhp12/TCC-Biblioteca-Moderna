import React from 'react'
import Main from '../template/main'
import { useForm } from "react-hook-form";
import axios from 'axios'


const headerProps = {
    icon: 'user',
    title: 'Alunos',
    subtitle: 'Cadastro de Alunos'
}

const baseUrl = 'http://localhost:8085/api/alunos/';
const baseUrlPost = 'http://localhost:8085/api/alunos/cadastrar';
const baseUrlDelete = 'http://localhost:8085/api/alunos/apagar/'

const initState= {
    aluno: { cpf:'', nome:'', email: '', telefone: ''},
    list: []
}



export default class AlunoCrud extends React.Component {

    
    
    state = { ...initState }

    componentWillMount() {
        axios.get(baseUrl,baseUrlPost,baseUrlDelete,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ list: resp.data })/**salvamos dentro da lista as requisições */
        })        
    }

     /*Limpar formulario */
     clear() {
        this.setState({ aluno: initState.aluno })
    }

    save() {
        const aluno = this.state.aluno     
        const method = aluno.id ? 'put' : 'post'
        const url = aluno.id ? `${baseUrlPost}/${aluno.id}` : baseUrlPost
        var config = {
            headers: {crossdomain: true}
        };
        axios[method](url,aluno,config)
        .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ aluno: initState.aluno, list })  
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

    getUpdatedList(aluno){       
        const list = this.state.list.filter(a => a.id !== aluno.id) /**removendo o usuario da lista */
        list.unshift(aluno) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const aluno = { ...this.state.aluno }
        aluno[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ aluno })
    }
    
    renderForm(){
       
        /**jsx que ira renderizar o formulário */
        return (
            
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">CPF</label>
                            <input type="number" className="form-control" 
                                name="cpf" 
                                value={this.state.aluno.cpf}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o CPF.."
                                />
                                
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" className="form-control" 
                                name="nome" 
                                value={this.state.aluno.nome}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o nome.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input type="email" className="form-control" 
                                name="email" 
                                value={this.state.aluno.email}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o email.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Telefone</label>
                            <input type="text" className="form-control" 
                                name="telefone" 
                                value={this.state.aluno.telefone}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o telefone.."
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
    load(aluno){
        this.setState({ aluno })/**atualiza o estado da aplicação. */
    }

    remove(aluno){
        axios.delete(`${baseUrlDelete}${aluno.cpf}`)
        .then(resp => {
            const list = this.state.list.filter(a => a !== aluno)
            this.setState({ list })
        })
    }

    /**list users */
    rendertable(){
        return(
            <table className="table mt-4">
               <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
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
        return this.state.list.map((aluno) => {
            return (                
                <tr key={aluno.cpf}>
                    <td>{aluno.cpf}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.telefone}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(aluno)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(aluno)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    renderSelectAluno(){
        return(
            <select class="form-select" aria-label="Default select example">
                      {this.renderOptionAluno()} 
            </select>
        );
    }

    renderOptionAluno(){
        return this.state.list.map((aluno) => {
            return (
                    <option value={aluno.nome}>{aluno.nome}</option>
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