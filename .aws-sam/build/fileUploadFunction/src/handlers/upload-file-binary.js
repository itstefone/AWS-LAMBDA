const AWS = require('aws-sdk');
const fileType = require('file-type');

const bucketRegion = 'eu-central-1';
const accessKeyId = 'AKIAZK4VMB5RKH4QHE6A';
const secretAccessKey = '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';
const srcBucket = 'stefoneimagebucket';

const s3bucket = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region:bucketRegion
});

exports.handler = async (event) => {


  
    let response 
    let binnaryImage = event.body;

    console.log('body', binnaryImage);

    var buffer = new Buffer.from(binnaryImage, 'binary');

    console.log(buffer);
    // let fileInfo = await fileType.fromBuffer(buffer);
    // console.log(fileInfo);
    
    let uniqueFileName = Math.random().toString(36).substring(7) + '.jpg';

    let params = {
        Bucket: srcBucket,
        Key: uniqueFileName,
        Body: buffer,
        ACL: 'public-read'
    }
        let result = await s3bucket.putObject(params).promise();
        let url = `https://${srcBucket}.s3.${bucketRegion}.amazonaws.com/${uniqueFileName}`;







    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "File successfully uploaded",
            url: url,
            result
        })
    }

   

//     let options = {
//         method: event.httpMethod,
//         hostname: 'https://bza1gxg3n8.execute-api.eu-central-1.amazonaws.com/',
//         path: 'Prod/upload'
//     };

//     console.log('ovde');

//     let apiResponse = await proxyRequest(options, event.body, event.isBase64Encoded);


//     console.log(apiResponse);

//     // Handling returning binary response from server
//     let isBase64 = false;
//     if((apiResponse.headers && apiResponse.headers['content-disposition'] && apiResponse.headers['content-disposition'].includes('attachment')) || 
//                         (apiResponse.headers['content-type'] && apiResponse.headers['content-type'].includes('image'))) {
//         isBase64 = true;
//     } 

//     response = {
//         "statusCode": apiResponse.statusCode,
//         "headers": apiResponse.headers,
//         "body": apiResponse.data,
//         "isBase64Encoded": isBase64
//     };
//     return response;
// };

// function proxyRequest(options, requestBody, isBodyBase64Encoded) {
//     return new Promise((resolve, reject) => {
//         let request = https.request(options, response => {
//             let bodyData = [];

//             console.log(options);

//             response.on('data', chunk => {
//                 bodyData.push(chunk);
//             });

//             response.on('end', () => {
//                 try {
//                     let resData = null;
//                     if((response.headers && response.headers['content-disposition'] && response.headers['content-disposition'].includes('attachment')) || 
//                         (response.headers['content-type'] && response.headers['content-type'].includes('image'))) {
//                         resData = bodyData.length > 0 ? Buffer.concat(bodyData).toString('base64') : null;
//                         console.log('base64 chunks');
//                     }
//                     else {
//                         resData = bodyData.length > 0 ? Buffer.concat(bodyData).toString() : null;
//                     }
//                     resolve({
//                         statusCode: response.statusCode,
//                         headers: response.headers,
//                         data: resData
//                     });
//                 }
//                 catch (e) {
//                     console.log('Error processing response: ', e);
//                     reject(e);
//                 }
//             });

//             response.on('error', err => {
//                 console.log('unexpected error: ', err);
//                 reject(err);
//             });
//         });

//         if (requestBody !== null)
//             request.write(requestBody, isBodyBase64Encoded ? 'base64' : 'utf8');
            
//         request.end();
//     });
}