import boto3
import cStringIO
from PIL import Image, ImageOps
import os

s3 = boto3.client('s3')
size = int(os.environ['THUMBNAIL_SIZE'])

def s3_thumbnail_generator(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    if (key.endswith("_thumbnail.png")): 
        return

    image = get_s3_image(bucket, key)
    thumbnail = image_to_thumbnail(image)
    thumbnail_key = new_filename(key)

    return upload_to_s3(bucket, thumbnail_key, thumbnail)

def get_s3_image(bucket, key):
    response = s3.get_object(Bucket=bucket, Key=key)
    imagecontent = response['Body'].read()

    file = cStringIO.StringIO(imagecontent)
    return Image.open(file)

def image_to_thumbnail(image):
    return ImageOps.fit(image, (size, size), Image.ANTIALIAS)

def new_filename(key):
    key_split = key.rsplit('.', 1)[0]
    return key_split + "_thumbnail.png"

def upload_to_s3(bucket, key, image):

    out_thumbnail = cStringIO.StringIO()

    image.save(out_thumbnail, 'PNG')
    out_thumbnail.seek(0)

    response = s3.put_object(
        ACL='public-read',
        Body=out_thumbnail,
        Bucket=bucket,
        ContentType='image/png',
        Key=key,
    )
    return '{}/{}/{}'.format(s3.meta.endpoint_url, bucket, key)