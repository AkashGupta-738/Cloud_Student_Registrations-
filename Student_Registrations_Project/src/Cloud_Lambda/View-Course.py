import json
import boto3

client = boto3.resource('dynamodb')
table=client.Table('CoursesTermSeatNo')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    termFromEvent = body['term']
    response = table.get_item(Key={
    "Term_Name":termFromEvent
    })
    responseJson = {}
    responseJson['statusCode'] = 200
    responseJson['headers'] = {}
    responseJson['headers']['Content-Type'] = 'application/json'
    responseJson['headers']['Access-Control-Allow-Origin'] = '*'
    responseJson['headers']['Access-Control-Allow-Methods'] = 'OPTIONS,POST,GET'
    responseJson['body'] = json.dumps(response["Item"]["Courses"])

    return responseJson
