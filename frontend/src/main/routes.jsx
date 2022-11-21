import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/home'
import UserCrud from '../components/user/user-crud'
import AlunoCrud from '../components/alunos/AlunoCrud'
import LivroCrud from '../components/livros/LivroCrud'
import FuncionarioCrud from '../components/funcionarios/FuncionarioCrud'
import Emprestimo from '../components/emprestimo/Emprestimo'


/*Mapeamento dos links aos componentes*/
export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/funcionarios" component={FuncionarioCrud} />
        <Route exact path="/alunos" component={AlunoCrud} />
        <Route exact path="/livros" component={LivroCrud} />
        <Route exact path="/emprestimo" component={Emprestimo} />
       
        
     
        <Redirect from="*" to="/" />
    </Switch>


