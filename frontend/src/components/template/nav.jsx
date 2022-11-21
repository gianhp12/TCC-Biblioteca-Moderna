import React from 'react'
import './nav.css'

import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Home
            </Link>
            <Link to="/funcionarios">
                <i className="fa fa-users"></i> Funcionários
            </Link>
            <Link to="/alunos">
                <i className="fa fa-user"></i> Alunos
            </Link>
            <Link to="/livros">
                <i className="fa fa-book"></i> Livros
            </Link>
            <Link to="/emprestimo">
                <i className="fa fa-leanpub"></i> Emprestimo
            </Link>
        </nav>
    </aside>