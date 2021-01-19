import { DynamoDB } from "aws-sdk";

const dbConfig =
  process.env.ENV === "dev"
    ? {
        region: "localhost",
        endpoint: "http://localhost:8000",
      }
    : {};
const dynamoDb = new DynamoDB.DocumentClient(dbConfig);

export default dynamoDb;
