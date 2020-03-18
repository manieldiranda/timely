import React, {Component} from 'react';
import NavBar from "./NavBar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'


import '../css/EmployeeProfile.css';
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Moment from "react-moment";
import Alert from "react-bootstrap/Alert";

const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class EmployeeProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            api: 'http://localhost:8000/',
            profile: {
                time_entries: ['']
            }
        }

    }


    componentDidMount() {
  this.getProfileInfo();


    }

    hello = () => {
        console.log("HELLO")
    }

    deleteTimeEntry = (time_entry_id) => {
        console.log(time_entry_id);
        let time_entry = JSON.stringify(time_entry_id);
        console.log("DELETING")
         axios.delete(`${BASE_API_URL}api/time_entries/${time_entry}/`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                console.log(response);
                this.getProfileInfo();
    })

    };

    getProfileInfo = () => {
        const id = this.props.match.params.id;
            axios.get(`${BASE_API_URL}api/employees/${id}/`, {
            params: {}
        })
        //setting profile information in state
            .then(response => {
                console.log(response)
                let profile = response.data;
                this.setState({profile: profile}); //preferredName = profile['preferred_name']
            })
            //if theres an error console log it
            .catch(error => {
                console.log(error);
            })
            //After everything, set is-loading to false (removes loading spinner)
            .finally(() => {
                this.setState({is_loading: false});


            });

    }

    goBack = () => {
                        this.props.history.push("/home");

    }

    render() {
        return (
            <div>
                <NavBar logged_in={this.state.logged_in}/>
                <Card className="logInFormCard" bg="dark" text="white" style={{width: '50%'}}>
                    <Card.Header>
                        <h3> Employee Details for: <h1>
                            <b>{this.state.profile.first_name} {this.state.profile.last_name} </b></h1></h3>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>

                            <h4> Please select a time entry to edit: </h4>
                        </Card.Text>


                        <Accordion className={"timeEntryAccordion"}>

                            {this.state.profile.time_entries.map(timeEntryInfo => {
                                const {date, clock_in, clock_out, late, time_entry_id} = timeEntryInfo;

                                return (

                                    <Card>
                                        <Accordion.Toggle date={date} clock_in={clock_in}
                                                          clock_out={clock_out} late={late}
                                                          time_entry_id={time_entry_id} as={Card.Header}
                                                          eventKey={time_entry_id}>
                                            <Moment
                                                format="MM/DD/YYYY">{date}</Moment>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={time_entry_id}>
                                            <Card.Body>
                                                <div className={"timeEntryDetailContainer"}>
                                                    <div className={"clockIn timeEntryDetail"}>
                                                        <h6><b> Clock In:</b></h6>
                                                        <Moment
                                                            format="hh:mm A">{clock_in}</Moment>
                                                    </div>
                                                    <div onClick={this.hello} className={"clockOut timeEntryDetail"}>
                                                        <h6><b> Clock Out:</b></h6>
                                                        {clock_out == null ? (<p> Pending </p>) : (<Moment
                                                            format="hh:mm A">{clock_out}</Moment>)}


                                                    </div>
                                                    <div className={"late timeEntryDetail"}>

                                                        {`${this.props.late}` == true ? (
                                                            <div className={'alertContainer'}>
                                                                <Alert className={"lateAlert"}
                                                                       variant={'danger'}>
                                                                    Late
                                                                </Alert>
                                                            </div>) : (
                                                            <div className={'alertContainer'}><Alert
                                                                className={"lateAlert"} variant={'info'}>
                                                                On Time
                                                            </Alert>

                                                            </div>
                                                        )}

                                                    </div>
                                                    <div className={"deleteButtonContainer"}>
                                                    <Button onClick={(e)=>this.deleteTimeEntry(time_entry_id)} className={"deleteButton"} variant="danger"><b>x</b></Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>


                                )
                            })}
                        </Accordion>
                        <div className={"goBackButtonContainer"}>
                        <Button onClick={this.goBack} className={"goBackButton"} variant="primary">Go Back</Button>
                        </div>
                    </Card.Body>

                </Card>
            </div>
        );
    }
}

EmployeeProfile.propTypes = {};

export default EmployeeProfile;