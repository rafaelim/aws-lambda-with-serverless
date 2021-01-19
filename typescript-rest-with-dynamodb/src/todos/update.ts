import { APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import dynamoDb from "../db";

export const update = (
  event: APIGatewayEvent,
  _: unknown,
  callback: APIGatewayProxyCallback,
) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.text !== "string" || typeof data.checked !== "boolean") {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't update the todo item.",
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      "#todo_text": "text",
    },
    ExpressionAttributeValues: {
      ":text": data.text,
      ":checked": data.checked,
      ":updatedAt": timestamp,
    },
    UpdateExpression:
      "SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  };

  dynamoDb
    .update(params)
    .promise()
    .then((it) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(it.Attributes),
      }),
    )
    .catch((error) => {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todo item.",
      });
    });
};
