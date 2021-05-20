'use-strict';
const axios = require('axios');
exports.handler = async (event) => {
  let city = event.pathParameters.city;

<<<<<<< HEAD
  let url = `https://api.weatherapi.com/v1/current.json?key=aa4af4aba2ac4f229d390048211705&q=${city}&aqi=no
    `;

  let body = await axios.get(url);

  console.log('dasdas');

  console.log('dsadadsds');
=======
    let city = event.pathParameters.city;

    let url = `https://api.weatherapi.com/v1/current.json?key=aa4af4aba2ac4f229d390048211705&q=${city}&aqi=no
    `;

    let body = await axios.get(url);
    const response = {
        statusCode: 200,
        body: JSON.stringify(body.data)
    };
>>>>>>> de107d20611a357061a012bf9b58328447a42b3e

  const response = {
    statusCode: 200,
    body: JSON.stringify(body.data),
  };

<<<<<<< HEAD
  return response;
};
=======
    return response;
}



export function getFromS3(fileName, path){
    const params = {
        Bucket: bucketName,
        Key: `${path}/${fileName}`,
    };

    return new Promise((resolve, reject) => {
        s3bucket.getObject(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}
>>>>>>> de107d20611a357061a012bf9b58328447a42b3e
