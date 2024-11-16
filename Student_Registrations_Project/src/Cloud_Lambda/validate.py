import json
import boto3

# Initialize the SNS client object outside of the handler
client = boto3.resource('dynamodb')
table=client.Table('Student_Credentials')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email_id = body['email_id']
        password  = body['password']
        
        response = table.get_item(Key={
        "Student_Email":email_id
        })
        
        print(response)
        
        responseJson = {}
        
        if 'Item' in response:
            if response["Item"]["Password"] == password:
                responseJson['body']='true'
            else:
                responseJson['body']='false'
        else:
            responseJson['body']='false'

        responseJson['statusCode'] = 200
        responseJson['headers'] = {}
        responseJson['headers']['Content-Type'] = 'application/json'
        responseJson['headers']['Access-Control-Allow-Origin'] = '*'
        responseJson['headers']['Access-Control-Allow-Methods'] = 'OPTIONS,POST,GET'

        return responseJson
        
    except Exception as e:
        print('Authentication Failed')
        return {'status': 'error', 'message': str(e)}