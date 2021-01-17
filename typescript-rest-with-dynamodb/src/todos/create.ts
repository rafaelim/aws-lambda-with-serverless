import { v1 } from "uuid";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyCallback, APIGatewayProxyEventBase } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = (
  event: APIGatewayProxyEventBase<any>,
  _: unknown,
  callback: APIGatewayProxyCallback,
) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== "string") {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't create the todo item. Text was not provided",
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb
    .put(params)
    .promise()
    .then((_) => {
      console.error(`Item created; item id=> ${params.Item.id}`);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      });
    })
    .catch((error) => {
      console.error(
        `Couldn't create the todo item; item id=> ${params.Item.id}`,
      );
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't create the todo item.",
      });
    });
};
