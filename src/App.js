import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CognitiveApi from './Components/cognitive_api';
import SignUp from './Components/signup';
import Home from './Components/home';
import *  as firebase from 'firebase'; 
import{
  BrowserRouter as Router,
  Route,
  Link
  }from 'react-router-dom';
class App extends Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(()=>{
      
      this.setState({
          user: firebase.auth().currentUser
      })
    })
  }
  render() {
    return (
      
      <div className="App">
        <Router>
              <div>
            <Route exact path="/" component ={Home}/>
            <Route path="/SignUp" component={SignUp}/> 
            <Route path="/cognitiveCam" component={CognitiveApi}/>
                <footer style={{marginTop:'400px', backgroundColor:'#2D0339' ,color:'white'}}>
                      <p>Posted by: Inside View</p>
                      <p>Contact information: <a href="mailto:mirzaumersaleem@outlook.com">
                        info@indsideView.com.</a></p>
                </footer>
              </div>
        </Router>

      </div>
    );
  }
}

export default App;
