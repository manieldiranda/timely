import React, {Component} from 'react';
import NavBar from "./NavBar";
import '../css/AdminHomePage.css';
import EmployeeProfileCard from "./EmployeeProfileCard";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import {motion} from "framer-motion";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Panel} from "primereact/panel";
import {Chart} from "primereact/chart";
import {SelectButton} from "primereact/selectbutton";

const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class AdminHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            api: 'http://localhost:8000/',
            loading: true,
            employeeData: [],
            buttonChoice: 'overview'


        }

    }


    componentDidMount() {
        this.getEmployeeInfo();
    }

    getEmployeeInfo = () => {

        axios.get(`${BASE_API_URL}api/employees/`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                let employeeData = response.data;
                this.setState({
                    employeeData: employeeData
                });

            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            });
    };


    render() {

        const buttonChoices = [
            {label: 'Overview', value: 'overview'},
            {label: 'Employees', value: 'employees'}
        ];


        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: '4/4/2020',
                    data: [16, 18, 18, 20, 20, 24, 22],
                    backgroundColor: [
                        "#067BC2",
                        "#ECC30B",
                        "#F37748",
                        "#84BCDA",
                        "#D56062",
                        "#2A9D8F",
                        "#F4A261",
                    ],
                    hoverBackgroundColor: [
                        "#067BC2",
                        "#84BCDA",
                        "#ECC30B",
                        "#F37748",
                        "#D56062",
                        "#2A9D8F",
                        "#F4A261",
                    ]
                }]
        };

        const waveGraphdata = {
            labels: ['4/5/20', '4/12/20', '4/19/20', '4/26/20', '5/3/20', '5/10/20', '5/17/20'],
            datasets: [
                {
                    label: '4/4/2020',
                    data: [16, 18, 18, 20, 20, 24, 22],
                    backgroundColor: [
                        "#067BC2",
                        "#ECC30B",
                        "#F37748",
                        "#84BCDA",
                        "#D56062",
                        "#2A9D8F",
                    ],
                    hoverBackgroundColor: [
                        "#067BC2",
                        "#84BCDA",
                        "#ECC30B",
                        "#F37748",
                        "#D56062",
                        "#2A9D8F",
                        "#F4A261",
                    ]
                }]
        };



        return (

            <div>
                <motion.div
                    initial={{y: -100}}
                    animate={{y: -0}}
                    transition={{duration: 1}}
                >

                    <NavBar logged_in={this.props.logged_in}/>
                </motion.div>

                <div className="adminPanelCard">
                    {this.state.loading === true ? (
                        <div className={'loadingSpinnerContainer'}>
                            <Spinner className={'loadingSpinner'} animation="border" variant="primary"/>
                        </div>

                    ) : (

                        <div className={'adminContentContainer'}>
                            <h2> Welcome to Timely, Admin. {this.props.first_name} </h2>

                            <br/>
                            <div className={'mobileAdminContent'}>
                                <div className={'detailChoiceButtonsContainer'}>
                                    <SelectButton value={this.state.buttonChoice} options={buttonChoices}
                                                  onChange={(e) => this.setState({buttonChoice: e.value})}></SelectButton>

                                </div>

                                {this.state.buttonChoice === 'overview' ? (


                                    <Container className={'adminGraphContainer showingOnMobile'}>
                                        <Row>
                                            <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                                <Panel header="Hours Per Day (This Week)">
                                                    <Chart type="bar" data={data} options={{legend: {display: false}}}/>

                                                </Panel>
                                            </Col>
                                            <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                                <Panel header="Avg Hours Per Week">
                                                    <Chart type="line" data={waveGraphdata}
                                                           options={{legend: {display: false}}}/>

                                                </Panel>
                                            </Col>
                                            <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                                <Panel header="Hours Scheduled Per Employee ">
                                                    <Chart type="pie" data={data} options={{legend: {display: false}}}/>

                                                </Panel>
                                            </Col>

                                            <div className={'noteContainer'}>
                                                <p> *Test data being used</p>
                                            </div>
                                        </Row>

                                    </Container>


                                ) : (
                                    <div>
                                        <h3> Here is your team: </h3>
                                        <h6> Please select someone to make changes </h6>

                                        <div className={'employeeList'}>

                                            {this.state.employeeData.map(employeeInfo => {
                                                const {first_name, last_name, is_super_user, employee_id} = employeeInfo;

                                                return (

                                                    <EmployeeProfileCard employee_id={employee_id}
                                                                         first_name={first_name}
                                                                         last_name={last_name}
                                                                         is_super_user={is_super_user}/>

                                                )
                                            })}
                                        </div>

                                    </div>


                                )}


                            </div>

                            <div className={'desktopAdminContent'}>
                                <Container className={'adminGraphContainer showingOnMobile'}>
                                    <Row>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Hours Per Day (This Week)">
                                                <Chart type="bar" data={data} options={{legend: {display: false}}}/>

                                            </Panel>
                                        </Col>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Avg Hours Per Week">
                                                <Chart type="line" data={waveGraphdata}
                                                       options={{legend: {display: false}}}/>

                                            </Panel>
                                        </Col>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Dist. Hours Per Employee ">
                                                <Chart type="pie" data={data} options={{legend: {display: false}}}/>

                                            </Panel>
                                        </Col>

                                        <div className={'noteContainer'}>
                                            <p> *Test data being used</p>
                                        </div>
                                    </Row>

                                </Container>
                                <h3> Here is your team: </h3>
                                <h6> Please select someone to make changes </h6>

                                <div className={'employeeList'}>

                                    {this.state.employeeData.map(employeeInfo => {
                                        const {first_name, last_name, is_super_user, employee_id} = employeeInfo;

                                        return (

                                            <EmployeeProfileCard employee_id={employee_id} first_name={first_name}
                                                                 last_name={last_name} is_super_user={is_super_user}/>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    )}


                </div>
            </div>
        )
            ;
    }
}

AdminHomePage.propTypes = {};

export default AdminHomePage;
