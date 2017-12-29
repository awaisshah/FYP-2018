import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Webcam from 'react-webcam';
import $ from 'jquery'; 
import base64Arraybuffer from 'base64-arraybuffer'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import request from 'superagent';
import { image } from 'superagent/lib/node/parsers';

const CLOUDINARY_UPLOAD_PRESET = 'bucket';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/insideview/upload ';
const subscriptionKey = "b97c70de7c2441638745a3f32f96bc39";
const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";


export default class Webcamp extends Component{
    constructor() {
        super();
        this.state = {
           
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        }
      
    }

      setRef = (webcam) => {
        this.webcam = webcam;
      }
      capture = () => {
        const imageSrc = this.webcam.getScreenshot(); 
        console.log(imageSrc)
        
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', imageSrc);

              upload.end((err, response) => {
                  if (err) {
                      console.error(err);
                  }

                  if (response.body.secure_url !== '') {
                      this.setState({
                      uploadedFileCloudinaryUrl: response.body.secure_url
                      });
                      console.log("file Address : ",this.state.uploadedFileCloudinaryUrl);

                      var subscriptionKey = "b97c70de7c2441638745a3f32f96bc39";
                      var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
                      // Request parameters.
                      var params = {
                          "returnFaceId": "true",
                          "returnFaceLandmarks": "true",
                          "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
                      };

                      $.ajax({
                          url: uriBase + "?" + $.param(params),
                          // Request headers.
                          beforeSend: function (xhrObj) {
                              xhrObj.setRequestHeader("Content-Type", "application/json");
                              xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                              { console.log("in before function", xhrObj) }
                          },
                          type: "POST",
                          // Request body.
                          data: JSON.stringify({"url": response.body.secure_url }),
                      })
                          .done(function (data) {
                              // Show formatted JSON on webpage.
                              $("#responseTextArea").val((data, null, 2));
                              console.log(data)
                            //  var rootRef = firebase.database().ref();
                             // const speedRef = rootRef.child("Train").set(data)
              
              
                          })
                          .fail(function (e) {
                              // Display error me
                          });
                  }
           });



       // const imageSrc = this.webcam.getScreenshot();
        //let byte_array=base64Arraybuffer.decode(imageSrc)
        //  var byte_array=this._base64ToArrayBuffer(imageSrc);
        // //let byte_aray
        // setTimeout(function() {
        //     console.log("Going Live!");
        //     console.log("byte array",byte_array)
        //     var subscriptionKey = "b73895176fcd47928f96dcbe934d879e";
        //     var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
            
        //     var params = {
        //         "returnFaceId": "true",
        //         "returnFaceLandmarks": "true",
        //         "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        //     };
           
        //     document.querySelector("#sourceImage").src = imageSrc;  
        //     $.ajax({
        //         url: uriBase + "?" + $.param(params),
        //         // Request headers.
        //         beforeSend: function(xhrObj){
        //             xhrObj.setRequestHeader("Content-Type","application/octet-stream ");
        //             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        //             {console.log("in before function",xhrObj)}
        //         },
        //         type: "POST",
        //          byte_array        
        //     })
        //     .done(function(data) {
        //         // Show formatted JSON on webpage.
        //         $("#responseTextArea").val(JSON.stringify(data, null, 2));
        //         console.log(data)
        //     })
        //     .fail(function(jqXHR, textStatus, errorThrown) {
        //         // Display error message.
        //         console.log("in fail",textStatus , errorThrown ,jqXHR)
        //         var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        //         alert(errorString);
        //     });
        //   }, 7000);
      
       
      };
      close_web_camp = () => {
    
      }
    render(){
        return (
      <div>
            <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            />
            <RaisedButton label="Capture photo" primary={true} style={style}  onClick={this.capture}/>
            <RaisedButton label="Close Camera" primary={true} style={style}  onClick={this.close_web_camp}/>  
      </div>
        )
    }
}
const style = {
    margin: 12,
  };