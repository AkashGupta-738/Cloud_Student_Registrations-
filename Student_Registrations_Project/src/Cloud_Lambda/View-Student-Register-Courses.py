import json
import boto3

client = boto3.resource('dynamodb')
table=client.Table('Stundet_Courses')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    termFromEvent = body['term']
    email_id = body['email_id']
    response = table.get_item(Key={
    "Student_Email":email_id
    })
    
    responseJson = {}

    if 'Item' in response:
        responseJson['body']= json.dumps(response['Item'][termFromEvent])
    else:
        responseJson['body']='null'


    responseJson['statusCode'] = 200
    responseJson['headers'] = {}
    responseJson['headers']['Content-Type'] = 'application/json'
    responseJson['headers']['Access-Control-Allow-Origin'] = '*'
    responseJson['headers']['Access-Control-Allow-Methods'] = 'OPTIONS,POST,GET'

    return responseJson
