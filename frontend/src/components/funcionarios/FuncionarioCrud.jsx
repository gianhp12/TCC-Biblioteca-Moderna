import React from 'react'
import Main from '../template/main'

import axios from 'axios'

const headerProps = {
    icon: 'user',
    title: 'Funcionarios',
    subtitle: 'Cadastro de Funcionarios'
}

const baseUrl = 'http://localhost:8085/api/funcionarios/consultar/todos';
const baseUrlPost = 'http://localhost:8085/api/funcionarios/cadastrar';
const baseUrlDelete = 'http://localhost:8085/api/funcionarios/apagar/'

const initState= {
    funcionario: { cpf:'', nome:'', email: '', telefone: ''},
    list: []
}

export default class FuncionarioCrud extends React.Component {
    
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
        this.setState({ funcionario: initState.funcionario })
    }

    save() {
        const funcionario = this.state.funcionario     
        const method = funcionario.id ? 'put' : 'post'
        const url = funcionario.id ? `${baseUrlPost}/${funcionario.id}` : baseUrlPost
        var config = {
            headers: {crossdomain: true}
        };
        axios[method](url,funcionario,config)
        .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ funcionario: initState.funcionario, list })     
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

    getUpdatedList(funcionario){       
        const list = this.state.list.filter(f => f.id !== funcionario.id) /**removendo o usuario da lista */
        list.unshift(funcionario) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const funcionario = { ...this.state.funcionario }
        funcionario[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ funcionario })
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
                                value={this.state.funcionario.cpf}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o CPF.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" className="form-control" 
                                name="nome" 
                                value={this.state.funcionario.nome}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o nome.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input type="email" className="form-control" 
                                name="email" 
                                value={this.state.funcionario.email}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o email.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Telefone</label>
                            <input type="text" className="form-control" 
                                name="telefone" 
                                value={this.state.funcionario.telefone}
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
    load(funcionario){
        this.setState({ funcionario })/**atualiza o estado da aplicação. */
    }

    remove(funcionario){
        axios.delete(`${baseUrlDelete}${funcionario.cpf}`)
        .then(resp => {
            const list = this.state.list.filter(f => f !== funcionario)
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
        return this.state.list.map((funcionario) => {
            return (                
                <tr key={funcionario.cpf}>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.telefone}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(funcionario)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(funcionario)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }
    render(){        
        return(            
            <Main {...headerProps}>
                
                {this.renderForm()}
                {this.rendertable()}

            </Main>
        );
    }


}