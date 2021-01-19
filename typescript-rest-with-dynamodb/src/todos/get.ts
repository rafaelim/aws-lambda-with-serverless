import { APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import dynamoDb from "../db";

export const get = (
  event: APIGatewayEvent,
  _: unknown,
  callback: APIGatewayProxyCallback,
) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb
    .get(params)
    .promise()
    .then((it) => {
      console.log(`Item id -> ${params.Key.id}`);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(it.Item),
      });
    })
    .catch((error) => {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todo item.",
      });
    });
};
