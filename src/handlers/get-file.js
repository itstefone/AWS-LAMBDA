const AWS = require('aws-sdk');
const fs = require('fs');

const s3bucket = new AWS.S3({
    accessKeyId: 'AKIAZK4VMB5RE32K5WF3',
    secretAccessKey: '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',
    region: 'eu-central-1',
});

const srcBucket = 'stefoneimagebucket';

exports.handler = async (event,context, callback) => {
const params = {
    Bucket: srcBucket,
    Key: 'image-1.jpg'
}
//const data = await s3bucket.listObjects(params).promise();
s3bucket.getObject(params, (err, data) => {
    if(err) console.log(err);
    fs.writeFileSync('./' + 'image-1.jpg', data.Body);
});

// const files = data.Contents.map(file => {
//     return {fileName: file.Key};
// });

// const s3Params = {Bucket: srcBucket, Key: 'image-1.jpg'};

// const bucketObj = s3bucket.getObject(s3Params);

    

return true;

} 






function getFromS3(fileName){
    const params = {
        Bucket: 'stefoneimagebucket',
        Key: 'image-1.jpg',
    };

    return new Promise((resolve, reject) => {
        s3bucket.getObject(params, function () {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}


