import React,{Component} from 'react';
import Login from './login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Navigation from './navigation';
export default class Home extends Component{

render(){
    return (
      <div>
        <MuiThemeProvider>
            
            <AppBar
                title="Inside View"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={{marginBottom:'20',backgroundColor:'#2D0339'}}
            />
            <div>
               <Navigation {... this.props} style={{marginTop:500}}/>
               <Login { ... this.props}/>
            </div>                  
        </MuiThemeProvider>
      </div>
    )
}
}
