# Rest API - ToDo List with Typescript and dynamo db

## Getting started

### Installing

`npm install`

### Running locally

#### Plugins install

- `serverless plugin install -n serverless-dynamodb-local`
- `serverless plugin install -n serverless-offline`
- `serverless dynamodb install`

#### Starting offline

- Powershell:
  `$env:ENV="dev" ; $env:AWS_PROFILE="serverless-admin" ; serverless offline start`

### Deploy

`npx sls deploy -v`

### Testing

You can use this [Postman Collection](https://github.com/rafaelim/aws-lambda-with-serverless/tree/master/typescript-rest-with-dynamodb/postman) to test the endpoints;
**Remember to change the URL after the deployment was completed**

### Removing the function

`npx sls remove`
