import React from 'react';
import Search from './Search';
import Header from './Header'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';

const App = () => {
    return(
        <div className="container">
            <Header />
            <Search />
        </div>
    );
};

export default App;