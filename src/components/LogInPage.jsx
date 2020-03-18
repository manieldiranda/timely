import React, {Component} from 'react';
import '../css/LogInPage.css';
import NavBar from "./NavBar";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {withRouter} from "react-router-dom";


const BASE_API_URL = process.env.REACT_APP_BASE_URL;




class LogInPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            username: '',
            password: '',
            api: 'http://localhost:8000/'
        }

    }

    componentDidMount() {
        localStorage.removeItem('token');
    }

    handle_login = (e, data) => {
        e.preventDefault();
        axios.post(`${BASE_API_URL}auth-get-token/`, {
            username: data.username,
            password: data.password
        })
            .then((response) => {
                let logInResponse = response.data
                localStorage.setItem('token', logInResponse.token)
                console.log(logInResponse);
                this.setState({
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


    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };


    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${this.state.email}`)
    }


    render() {
        return (
            <div>
                <NavBar logged_in={false}/>
                <Card className="logInFormCard" bg="dark" text="white" style={{width: '50%'}}>

                    <Card.Header>

                        <h1> Welcome to Timely! </h1>
                    </Card.Header>

                    <Card.Body>
                        <Card.Text>
                            Please log in:
                        </Card.Text>
                        <div className={"logInForm"}>
                            <Form onSubmit={e => this.handle_login(e, this.state)}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Enter username" name="username"
                                                  value={this.state.username}
                                                  onChange={this.handle_change}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"
                                                  value={this.state.password} onChange={this.handle_change}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(LogInPage);