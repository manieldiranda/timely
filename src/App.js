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
    //CHECKING IF THE USER IS LOGGED IN BY CHECKING LOCALSTORAGE FOR TOKEN, and true loading spinner on by setting is loading to true
    constructor(props) {
        super(props);

    }





    render() {
        return (
           <Router/>
        // COMMENT TO SEE IF IT WORKS IN STASH
        );
    }
}

export default App;
