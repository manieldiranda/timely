import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import '../css/EmployeeProfileCard.css';
import {LinkContainer} from 'react-router-bootstrap';
const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class EmployeeProfileCard extends Component {
    render() {
        return (
            <div>


                {this.props.is_super_user == "True" ? (null) : (

                    <LinkContainer className={"link"} to={`/employee/${this.props.employee_id}`}>
                    <Card className={"employeeCard"} bg={"light"} style={{color: 'black !important'}}>
                    <Card.Body>
                        <div>
                            <h4> {this.props.first_name} {this.props.last_name} </h4>
                        </div>
                    </Card.Body>
                </Card>
                    </LinkContainer>



                )}

            </div>
        );
    }
}

EmployeeProfileCard.propTypes = {};

export default EmployeeProfileCard;