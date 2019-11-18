import React from 'react';
import Router from './Router';
import axios from 'axios'
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user.actions'

import './App.css';

class App extends React.Component {

  componentDidMount = () => {
    this.getUser();
  }
  
  getUser = async () => {

    try {
      const { setCurrentUser } = this.props;
      const response = await axios.get('https://cobalt-shop.herokuapp.com/user')
      const user = response.data
      console.log(user)
      if (user.loggedIn === true) {
        setCurrentUser(user)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  signOut = async () => {

    try {
      const { setCurrentUser } = this.props;
      const response = await axios.get('https://cobalt-shop.herokuapp.com/logOut') 
      setCurrentUser(null)
      return response.data.loggedOut 
    } catch (error) {
       console.log(error) 
    }
    
  }

  render() {
    return (
      <Router signOut={this.signOut} getUser={this.getUser} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
