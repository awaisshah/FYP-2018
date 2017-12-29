// // This folder used to connect with server
// import $ from 'jquery'; 
// var params = {
//     "returnFaceId": "true",
//     "returnFaceLandmarks": "true",
//     "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
// };
// let authHelpers = {
//     faceLandmarks: function (data) {
//         return fetch('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'+"?" + $.param(params), {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Ocp-Apim-Subscription-Key' : 'b73895176fcd47928f96dcbe934d879e'
//             },
//             body: JSON.stringify({url : data.sourceImageUrl})
//         })
//             .then(function (response) {
//                 return response.json();
//             })
//             // .then((responseJson) => {
//             //     return JSON.parse(responseJson);
//             // })
//             .catch(function (error) {
//                 console.log('There has been a problem with your fetch operation: ' + error);
//                 // ADD THIS THROW error
//                 throw error;
//             });
//     },
//     // loginRequest: function (data) {
//     //     return fetch(`${AUTH_URL}/local`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Accept': 'application/json',
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(login(data))
//     //     })
//     //         .then(function (response) {
//     //             return response.json();
//     //         })
//     //         .then((responseJson) => {
//     //             return responseJson;
//     //         })
//     //         .catch(function (error) {
//     //             console.log('There has been a problem with your fetch operation: ' + error);
//     //             // ADD THIS THROW error
//     //             throw error;
//     //         });
//     // }
// }
// export default authHelpers;