import React from "react";
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class Nav extends React.Component{
getSignUp(props){
 this.props.history.push('/SignUp');
}
 render(){
   return(
    <div >

     <MuiThemeProvider>
    <div id="nav_header">
     
     <RaisedButton label="Register" secondary={true} style={style} onClick={(event) => this.getSignUp(event)}/>
    </div>
     </MuiThemeProvider>  
    </div> 

   )}

}
const style = {
 margin: 5,
 left:50,
 marginLeft:'1200px',

};


