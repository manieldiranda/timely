//css for app.js
//imports for app.js
import React, {Component} from 'react';
import Router from './components/Router.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'



class App extends Component {






    render() {
        return (
           <Router/>
        );
    }
}

export default App;
