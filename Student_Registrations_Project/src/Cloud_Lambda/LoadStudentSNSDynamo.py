import json
import boto3

# Initialize the SNS client object outside of the handler
sns = boto3.client('sns')
client = boto3.resource('dynamodb')
table=client.Table('Student_Credentials')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email_id = body['email_id']
        first_name = body['first_name']
        last_name = body['last_name']
        password  = body['password']
        
        responseDynamo = table.put_item(
        Item={
            'Student_Email': email_id,
            'First_Name':first_name,
            'Last_Name':last_name,
            'Password':password,
        }
        )
        
        responseSns = sns.subscribe(
        TopicArn = 'arn:aws:sns:us-east-1:195974574940:NotifyStudent',
        Protocol = 'email',
        Endpoint = email_id
        )
        
        responseBody = {}
        responseBody['responseDynamo']=responseDynamo
        responseBody['responseSns']=responseSns
        
        responseJson = {}
        responseJson['statusCode'] = 200
        responseJson['headers'] = {}
        responseJson['headers']['Content-Type'] = 'application/json'
        responseJson['headers']['Access-Control-Allow-Origin'] = '*'
        responseJson['headers']['Access-Control-Allow-Methods'] = 'OPTIONS,POST,GET'
        responseJson['body'] = json.dumps(responseBody)
        
        return responseJson
        
    except Exception as e:
        print('Failed to publish message to SNS topic')
        return {'status': 'error', 'message': str(e)}