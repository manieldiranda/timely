import React, {Component} from 'react';
import '../css/LogInPage.css';

import Button from 'react-bootstrap/Button';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {InputText} from 'primereact/inputtext';
import {motion} from "framer-motion"
import logInImage from '../images/undraw_creative_team_r90h (1).svg'
import Alert from 'react-bootstrap/Alert';


const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class LogInPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            username: '',
            password: '',
            error: false,
            showingErrorMessage: true,
            loading: false,
            api: 'http://localhost:8000/'
        }

    }


    componentDidMount() {
        localStorage.removeItem('token');
    }

    handle_login = (e, data) => {

        e.preventDefault();
        axios.post(`${BASE_API_URL}auth-get-token/`, {
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {

                let logInResponse = response.data
                localStorage.setItem('token', logInResponse.token)
                console.log(logInResponse);
                this.setState({
                    loading: true,
                    logged_in: true,
                })
                this.props.history.push("/home");
            })
            .catch((error) => {
                localStorage.removeItem('token');
                console.log(error);
                this.setState(
                    {error: true}
                )
            });
    };

    toggleMessageShow = () => {
        this.setState({
            showingInfoMessage: false
        })
    };


    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${this.state.email}`)
    }


    render() {
        return (
            <div className={'backgroundContainer'}>

                <motion.div
                    className="container"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{scale: 3}}
                >


                    <div className="container">


                        <div className="row">

                            {this.state.loading === true ? (
                                <div className="col-lg-10 col-xl-9 mx-auto">
                                    <div className="card card-signin flex-row my-5">
                                    </div>
                                </div>

                            ) : (


                                <div className="col-lg-10 col-xl-9 mx-auto">

                                    <div className="card card-signin flex-row my-5">

                                        <div className="card-img-left d-none d-md-flex">
                                        </div>
                                        <div className="card-body">
                                             <Alert variant="primary"
                                                   show={this.state.showingInfoMessage}
                                                   onClose={this.toggleMessageShow}
                                                   dismissible
                                            className={'logInInfoMessage desktopLogInInfoMessage'}>
                                                <b> Demo Mode:</b>
                                                <p> Admin Acc: admin/admin </p>
                                                <p> User Acc: employee/coolpass1@ </p>


                                            </Alert>
                                            <div className={`formContainer`}>
                                                <div className={'logInImageMobileContainer'}>
                                                    <img className={'logInImageMobile'} src={logInImage} alt={"welcomeImage"}/>
                                                </div>
                                                <h1 className="card-title"> Welcome to Timely</h1>
                                                <form className="form-signin">
                                                    <div className="form-label-group">
<span className="p-float-label">
    <InputText className={'logInFormInput'} value={this.state.username}
               onChange={(e) => this.setState({username: e.target.value})}/>
    <label htmlFor="in">Username</label>
</span>

                                                    </div>

                                                    <div className="form-label-group">
<span className="p-float-label">
    <InputText className={'logInFormInput'} type={"password"} id="in" value={this.state.password}
               onChange={(e) => this.setState({password: e.target.value})}/>
    <label htmlFor="in">Password</label>
</span>
                                                    </div>
                                                    {this.state.error === true ? (
                                                        <p> Invalid Username/Password</p>) : (null)}
                                                    <Button onClick={this.handle_login}
                                                            className="btn btn-lg btn-google btn-block text-uppercase"
                                                            type="submit"><i className="fab fa-google mr-2"></i> Sign In
                                                    </Button>
                                                </form>
                                            </div>
                                             <Alert variant="primary"
                                                   show={this.state.showingInfoMessage}
                                                   onClose={this.toggleMessageShow}
                                                   dismissible
                                            className={'logInInfoMessage mobileLogInInfoMessage'}>
                                                <b> Demo Mode:</b>
                                                <p> Admin Acc: admin/admin </p>
                                                <p> User Acc: employee/coolpass1@ </p>


                                            </Alert>
                                        </div>
                                    </div>
                                </div>


                            )}


                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
}

export default withRouter(LogInPage);
