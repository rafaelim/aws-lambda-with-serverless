import { APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteFn = (
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
    .delete(params)
    .promise()
    .then((_) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Item was deleted; item id => ${params.Key.id}`,
        }),
      });
    })
    .catch((error) => {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't remove the todo item.",
      });
    });
};
