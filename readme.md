# Aws Lambda with Serverless

## Getting Started

### Installing

`npm install -g serverless`

### Configuration

`serverless config credentials --provider aws --key {your_access_key} --secret {your_secret_key} --profile {your_profile}`

## Creating a new project

### With Python

`serverless create --template aws-python --path {project_name}`

## Deploy

### Entire stack

`serverless deploy -v`

### Only the Function

`serverless deploy function -f {function_name}`

## Remove

This command will remove the entire stack that our lambda is using.

`serverless remove`

## Invoke function in the CLI

`serverless invoke -f {function_name} -l`

## Fetch function logs

`serverless logs -f {function_name} -t`
