import React, { Component } from 'react';
import $ from 'jquery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Mcs from '../util/mcs';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Webcamp from './webcamp';
import * as firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';

import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import request from 'superagent';
import { image } from 'superagent/lib/node/parsers';
import { validateAsync, ParameterValidationError } from 'parameter-validator';
import ReactQueryParams from 'react-query-params';

const CLOUDINARY_UPLOAD_PRESET = 'bucket';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/insideview/upload ';
//const subscriptionKey = "b97c70de7c2441638745a3f32f96bc39";
//const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";


export default class CognitiveApi extends Component {

    


    constructor() {
        super();
        this.state = {
            image_source: '',
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({ image_source: event.target.value });
        console.log('image address', this.state.image_source)
    }

    processImage() {
        console.log("in function");
        // Mcs.faceLandmarks({sourceImageUrl : 'https://avatars2.githubusercontent.com/u/16153073?v=4&s=460'}).then((res)=>{
        //     console.log('response ', res);
        // })
        var subscriptionKey = "b97c70de7c2441638745a3f32f96bc39";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "true",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };
        // Display the image.
        var currentId = firebase.auth().currentUser.uid;
        var sourceImageUrl = this.state.image_source;


        document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),
            // Request headers.
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "b97c70de7c2441638745a3f32f96bc39");
                { console.log("in before function", xhrObj) }
            },
            type: "POST",
            // Request body.
            data: JSON.stringify({"url": sourceImageUrl}),
        })
            .done(function (data) {
                // Show formatted JSON on webpage.
                $("#responseTextArea").val(JSON.stringify(data, null, 2));
                console.log(data)
                var rootRef = firebase.database().ref();
                const speedRef = rootRef.child("Train").set(data)


            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // Display error message.
                console.log("in fail", textStatus, errorThrown, jqXHR)
                var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                alert(errorString);
            });
    };
    

    onImageChange(event) {
        var url = "";

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });
                  console.log("\n 64byte array : "+e.target.result);
                  this.setState({ uploadedFile: e.target.result });
                  console.log("file is in 64 byte arr : "+this.state.uploadedFile)
                  let upload = request.post(CLOUDINARY_UPLOAD_URL)
                  .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                  .field('file', e.target.result);

                        upload.end((err, response) => {
                            if (err) {
                                console.error(err);
                            }

                            if (response.body.secure_url !== '') {
                                url= response.body.secure_url;
                                //setInterval(() => this.setState({time: this.getTime()}), 50);
                                $(function() {
                                    var params = {
                                       
                                        "returnFaceId": "true",
                                        "returnFaceLandmarks": "true",
                                        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
                                       
                                    };
                                  
                                    console.log("URL >>>>>>>>>>>>>>>>>>>>>>> "+url)

                                  //console.log("\nFace >>>>>>>>>>>>>>>>>>>>>>>url>??????  "+this.state.uploadedFileCloudinaryUrl)
                                   if(response.body.secure_url){
                                       //alert("Pppsfsdfs"+url);
                                    $.ajax({
                                        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
                                        beforeSend: function(xhrObj){
                                            // Request headers
                                            xhrObj.setRequestHeader("Content-Type","application/json");
                                            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","b97c70de7c2441638745a3f32f96bc39");
                                        },
                                        type: "POST",
                                        // Request body
                                        //data: e.target.result,
                                        data: JSON.stringify({"url":""+response.body.secure_url+"" }),
                                    })
                                    .done(function(data) {
                                        alert("success");
                                        console.log("data",data);
                                    })
                                    .fail(function(e) {
                                        alert("error"+JSON.stringify(e));
                                    });
                                   } 
                                });

 
                                this.setState({
                                uploadedFileCloudinaryUrl: response.body.secure_url
                                });
                                console.log("file Address : ",this.state.uploadedFileCloudinaryUrl);


                               
                                // var subscriptionKey = "d8b5d6fa376c47c0acde7fe276ebe96e";
                                // var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
                                // // Request parameters.
                                // var params = {
                                //     "returnFaceId": "true",
                                //     "returnFaceLandmarks": "true",
                                //     "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
                                // };

                                // $.ajax({
                                //     url: uriBase + "?" + $.param(params),
                                //     // Request headers.
                                //     beforeSend: function (xhrObj) {
                                //         xhrObj.setRequestHeader("Content-Type", "application/json");
                                //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                                //         { console.log("in before function", xhrObj) }
                                //     },
                                //     type: "POST",
                                //     // Request body.
                                //     data: '{"url": ' + '"' + this.state.uploadedFileCloudinaryUrl + '"}',
                                // })
                                //     .done(function (data) {
                                //         // Show formatted JSON on webpage.
                                //         $("#responseTextArea").val(JSON.stringify(data, null, 2));
                                //         console.log(data)
                                //         var rootRef = firebase.database().ref();
                                //         const speedRef = rootRef.child("Train").set(data)
                        
                        
                                //     })
                                //     .fail(function (jqXHR, textStatus, errorThrown) {
                                //         // Display error message.
                                //         console.log("in fail", textStatus, errorThrown, jqXHR)
                                //         var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                                //         alert(errorString);
                                //     });
                            }
                     });
            };
          
            reader.readAsDataURL(event.target.files[0]);

        }

    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Inside View"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        style={{ marginBottom: '20', backgroundColor: '#2D0339' }}
                    />
                    <div>
                        <Paper style={style_paper3} zDepth={5} rounded={true} >
                            <input

                                hintText=" Paste Url  "
                                id="inputImage"
                                value={this.state.image_source} onChange={(event) => this.handleChange(event)}
                            /><br />
                            <RaisedButton label="Upload Image" primary={true} style={style} onClick={this.processImage.bind(this)} />
                            <br /><br />

                        </Paper>
                        <Paper style={style_paper3} zDepth={5} rounded={true} >
                            <br />
                            <input type="file" onChange={this.onImageChange.bind(this)} className="filetype" id="group_image" />
                            <br />
                            <div >
                                <img id="target" src={this.state.image} style={{ width: '400px', fontWeight: 'bold', display: 'table-cell', color: "#00BCD4" }} />
                            </div>
                            <br /><br />

                        </Paper>

                        <Paper style={style_paper1} zDepth={5} rounded={true} >
                            <Webcamp />
                        </Paper>

                    </div>
                    <div>
                        <Paper style={style_paper1} zDepth={5} rounded={true} >
                            <div id="imageDiv" style={{ width: '420', fontWeight: 'bold', display: 'table-cell', color: "#00BCD4" }}>
                                Source image
                        <br /><br />

                                <img id="sourceImage" width="400" height='400  ' align="center" />
                            </div>


                        </Paper>
                        <Paper style={style_paper2} zDepth={5} rounded={true} >

                            <div id="jsonOutput" style={{ width: "600", display: 'table-cell', color: "#00BCD4", fontWeight: 'bold' }}>
                                Results
                            <br /><br />
                                <div style={{ marginTop: '130px', marginLeft: '100px' }}>
                                    <textarea id="responseTextArea" />
                                    <CircularProgress color={'orange'} />
                                    <CircularProgress size={60} thickness={7} color={'2D0339'} />
                                    <CircularProgress size={80} thickness={5} color={'669900'} />
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const style = {
    margin: 12,
    backgroundColor: '#669900'
};
const style_paper1 = {
    height: 435,
    width: 400,
    margin: 20,
    flex: 1,
    textAlign: 'center',
    display: 'inline-block',
};

const style_paper2 = {
    height: 435,
    width: 400,
    margin: 20,
    flex: 1,
    textAlign: 'center',
    display: 'inline-block',
};
const style_paper3 = {
    height: 200,
    width: 400,
    margin: 20,
    flex: 1,
    textAlign: 'center',
    display: 'inline-block',
};
