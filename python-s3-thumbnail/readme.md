# S3 Thumbnails

## Getting Started

### Deploy

`npx sls deploy -v`

### Removing the function

`npx sls remove`

## Testing

To test the function you need to upload a new photo to the s3 bucket and then in a few seconds, the lambda function will generate and upload the thumbnail to the same bucket.
