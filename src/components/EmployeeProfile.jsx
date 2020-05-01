import React, {Component} from 'react';
import NavBar from "./NavBar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'


import '../css/EmployeeProfile.css';
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Moment from "react-moment";
import Alert from "react-bootstrap/Alert";
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import {SelectButton} from 'primereact/selectbutton';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import {Panel} from 'primereact/panel';
import {Chart} from 'primereact/chart';

;


const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class EmployeeProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            api: 'http://localhost:8000/',
            profile: {
                time_entries: ['']
            },
            buttonChoice: 'entries'
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

        const buttonChoices = [
            {label: 'Time Entries', value: 'entries'},
            {label: 'Overview', value: 'overview'}
        ];

                const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label:'4/4/2020',
                    data: [25, 40, 30, 40, 15, 20, 12],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#8285f8",
                        "#3072f2",
                        "#f26e44",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#8285f8",
                        "#3072f2",
                                                "#f26e44",
                    ]
                }]
        };

        return (
            <div className={'employeeProfileContainer'}>
                <NavBar logged_in={this.state.logged_in}/>
                <div className={'employeeProfileCardContainer'}>
                    <div >
                        <div className={'employeeProfileCard'}>
                        <h3> Employee Details for: <h1>
                            <b>{this.state.profile.first_name} {this.state.profile.last_name} </b></h1></h3>
                        <div className={'detailChoiceButtonsContainer'}>
                            <SelectButton value={this.state.buttonChoice} options={buttonChoices}
                                          onChange={(e) => this.setState({buttonChoice: e.value})}></SelectButton>

                        </div>
                        {this.state.buttonChoice === 'entries' ? (
                            <div>


                                <h4> Please select a time entry to edit: </h4>


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
                                                    {/*only displays on mobile*/}
                                                    <Button
                                                                            onClick={(e) => this.deleteTimeEntry(time_entry_id)}
                                                                            className={"deleteButton mobileDeleteButton"}
                                                                            variant="danger"><b>x</b></Button>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey={time_entry_id}>
                                                    <Card.Body>
                                                        <Container>
                                                            <Row className={'timeEntryDetailContainer'}>
                                                                <Col className={'timeEntryDetailColumn'}  xs={12} md={3}>

                                                                    <h6><b> Clock In:</b></h6>
                                                                    <Moment
                                                                        format="hh:mm A">{clock_in}</Moment>

                                                                </Col>
                                                                <Col  className={'timeEntryDetailColumn'} xs={12} md={3}>
                                                                    <h6><b> Clock Out:</b></h6>
                                                                    {clock_out == null ? (<p> Pending </p>) : (<Moment
                                                                        format="hh:mm A">{clock_out}</Moment>)}


                                                                </Col>
                                                                <Col className={'timeEntryDetailColumn'} xs={12} md={3}>

                                                                    {`${this.props.late}` === true ? (
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


                                                                </Col>
                                                                <Col className={'timeEntryDetailColumn'} xs={12} md={3}>
                                                                    <div className={'deleteButtonContainer desktopDeleteButtonContainer'}>
                                                                                                   <OverlayTrigger
                                placement={'top'}
                                overlay={
                                    <Tooltip>
                                        Delete Time Entry
                                    </Tooltip>
                                }
                            >
                                                                        <Button
                                                                            onClick={(e) => this.deleteTimeEntry(time_entry_id)}
                                                                            className={"deleteButton desktopDeleteButton"}
                                                                            variant="danger"><b>x</b></Button>
                                                                                                   </OverlayTrigger>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>


                                        )
                                    })}
                                </Accordion>


                            </div>


                        ) : (

                            <div className={'detailsContainer'}>
                                <h3> Time Entry Overview: </h3>


                                <Container>
                                    <Row>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Days Scheduled">
                                                <Chart type="bar" data={data} options={{legend:{display: false}}}/>

                                            </Panel>
                                        </Col>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Avg hours scheduled">
                                                <Chart type="line" data={data} options={{legend:{display: false}}}/>

                                            </Panel>
                                        </Col>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Num hours per week">
                                                <Chart type="pie" data={data} options={{legend:{display: false}}}/>

                                            </Panel>
                                        </Col>
                                    </Row>

                                </Container>
                            </div>

                        )}


                        <div className={"goBackButtonContainer"}>

                                <Button onClick={this.goBack} className={"goBackButton"} variant="primary">Go
                                    Back</Button>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

EmployeeProfile.propTypes = {};

export default EmployeeProfile;
