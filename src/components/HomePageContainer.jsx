import React, {Component} from 'react';
import '../css/EmployeeHomePage.css';
import axios from "axios";
import EmployeeHomePage from "./EmployeeHomePage";
import AdminHomePage from "./AdminHomePage";
const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class HomePageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            api: 'http://localhost:8000/',
            logged_in: localStorage.getItem('token') ? true : false,
            profile: {
                time_entries: ['']
            }
        }

    }

    componentDidMount() {
        if (this.state.logged_in === true) {
            this.getUserInfo();


        } else {
            this.setState({is_loading: false});
        }

    }

    getUserInfo = () => {

        axios.get(`${BASE_API_URL}timely_backend/current_user/`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                let currentUserInfo = response.data;
                this.setState({
                    first_name: currentUserInfo.first_name,
                    profile_id: currentUserInfo.id,
                    is_loading: false,
                    is_super_user: currentUserInfo.is_superuser
                });

            })
            .finally(() => {
                this.getProfileInfo();
            });
    };

    getProfileInfo = () => {
        axios.get(`${BASE_API_URL}api/employees/${this.state.profile_id}/`, {
            params: {}
        })
        //setting profile information in state
            .then(response => {
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


    render() {

        return (
            <div>

                {this.state.is_super_user === true ? (<AdminHomePage logged_in={this.state.logged_in} first_name={this.state.first_name}
                />) : (<EmployeeHomePage logged_in={this.state.logged_in}/>)}

            </div>
        );
    }
}


export default HomePageContainer;
