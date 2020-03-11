'use strict';
var dynamodb = require('serverless-dynamodb-client');
var docClient = dynamodb.doc;  // return an instance of new AWS.DynamoDB.DocumentClient()

const TableName = 'usersTable';

module.exports.hello = async event => {
  const newUser = {
    email: 'damien@26brains.com',
    name: 'Damien'
  }
  const putParams = {
    TableName,
    Item: newUser
  }

  const putRes = await docClient.put(putParams);
  console.log(putRes);

  const params = {
    TableName
  }

  const res = await docClient.scan(params);
  console.log(res.response);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        // input: event,
        data: res.response.data
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
