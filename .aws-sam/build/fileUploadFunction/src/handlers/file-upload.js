'use-strict';
const parser = require('lambda-multipart-parser');
const AWS = require('aws-sdk');
const fileType = require('file-type');

const bucketRegion = 'eu-central-1';
const accessKeyId = 'AKIAZK4VMB5RKH4QHE6A';
const secretAccessKey = '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';
const srcBucket = 'stefoneimagebucket';

const s3bucket = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: bucketRegion,
});

exports.handler = async (event) => {
  console.log(event);
  console.log(event.body);
  const body = Buffer.from(event.body, 'base64');
  console.log(body);
  const result = await parser.parse(event);

  let file = result.files[0];

  let params = {
    Bucket: srcBucket,
    Key: file.filename,
    Body: file.content,
  };

  let llalal = await s3bucket.putObject(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      hello: 'World',
      llalal,
    }),
  };
};
