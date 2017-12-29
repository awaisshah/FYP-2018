import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase'
import registerServiceWorker from './registerServiceWorker';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBrazceUMd6t_1QtRW0wA4K1nqawGWIFOo",
    authDomain: "insideview-c0be0.firebaseapp.com",
    databaseURL: "https://insideview-c0be0.firebaseio.com",
    projectId: "insideview-c0be0",
    storageBucket: "insideview-c0be0.appspot.com",
    messagingSenderId: "97220031317"
  };
  firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
