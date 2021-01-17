import { APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

export const list = (
  event: APIGatewayEvent,
  _: unknown,
  callback: APIGatewayProxyCallback,
) => {
  dynamoDb
    .scan(params)
    .promise()
    .then((it) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(it.Items),
      });
    })
    .catch((error) => {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todos.",
      });
    });
};
