import React from 'react';
import Router from './Router';
import axios from 'axios'

import CurrentUserContext from './contexts/current-user/current-user.context'

// urls
import { localURL, productionURL } from './helpers/fetch-urls'

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      currentUser: null
    }
  }
  componentDidMount = () => {
    this.getUser();
  }
  
  getUser = async () => {

    try {

      let axiosConfig = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://cobalt-shop.herokuapp.com/',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }
      }

      const response = await axios.get(`${process.env.NODE_ENV === 'production' ? productionURL : localURL}/user`, axiosConfig)
      const user = response.data
      if (user.loggedIn === true) {
        this.setState({currentUser: user })
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  signOut = async () => {

    try {
      const response = await axios.get(`${process.env.NODE_ENV === 'production' ? productionURL : localURL}/logOut`) 
      this.setState({ currentUser: null })
      return response.data.loggedOut 
    } catch (error) {
       console.log(error) 
    }
    
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Router signOut={this.signOut} getUser={this.getUser}/>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
