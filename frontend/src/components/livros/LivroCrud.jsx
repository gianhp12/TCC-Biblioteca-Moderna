import React from 'react'
import Main from '../template/main'

import axios from 'axios'

const headerProps = {
    icon: 'book',
    title: 'Livros',
    subtitle: 'Cadastro de Livros'
}

const baseUrl = 'http://localhost:8085/api/livros/consultar/todos';
const baseUrlPost = 'http://localhost:8085/api/livros/cadastrar';
const baseUrlDelete = 'http://localhost:8085/api/livros/apagar/';

const initState= {
    livro: { codigo:'', titulo:'', autor: '', datacompra: ''},
    list: []
}

export default class LivroCrud extends React.Component {
    
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
        this.setState({ livro: initState.livro })
    }

    save() {
        const livro = this.state.livro     
        const method = livro.id ? 'put' : 'post'
        const url = livro.id ? `${baseUrlPost}/${livro.id}` : baseUrlPost
        var config = {
            headers: {crossdomain: true}
        };
        axios[method](url,livro,config)
        .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ livro: initState.livro, list })  
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

    getUpdatedList(livro){       
        const list = this.state.list.filter(l => l.id !== livro.id) /**removendo o usuario da lista */
        list.unshift(livro) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const livro = { ...this.state.livro }
        livro[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ livro })
    }

    renderForm(){
        /**jsx que ira renderizar o formulário */
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Código</label>
                            <input type="number" className="form-control" 
                                name="codigo" 
                                value={this.state.livro.codigo}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o código do livro.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Titulo</label>
                            <input type="text" className="form-control" 
                                name="titulo" 
                                value={this.state.livro.titulo}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o titulo do livro.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Autor</label>
                            <input type="email" className="form-control" 
                                name="autor" 
                                value={this.state.livro.autor}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o autor do livro.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Data da compra</label>
                            <input type="date" className="form-control" 
                                name="datacompra" 
                                value={this.state.livro.datacompra}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a data da compra.."
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
    load(livro){
        this.setState({ livro })/**atualiza o estado da aplicação. */
    }

    remove(livro){
        axios.delete(`${baseUrlDelete}${livro.codigo}`)
        .then(resp => {
            const list = this.state.list.filter(l => l !== livro)
            this.setState({ list })
        })
    }

    /**list users */
    rendertable(){
        return(
            <table className="table mt-4">
               <thead>
                    <tr>
                        <th>Código</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Data da Compra</th>
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
        return this.state.list.map((livro) => {
            return (                
                <tr key={livro.codigo}>
                    <td>{livro.codigo}</td>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.datacompra}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(livro)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(livro)}>
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