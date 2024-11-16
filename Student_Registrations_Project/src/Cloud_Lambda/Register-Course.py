import json
import boto3

sns = boto3.client('sns')
client = boto3.resource('dynamodb')
Stundet_Courses_Table=client.Table('Stundet_Courses')
Courses_Seat_No_Table=client.Table('CoursesTermSeatNo')

def lambda_handler(event, context):
    try:
        body = json.loads(event['Records'][0]['body'])
        email_id = body['student_email']
        term = body['term_selected']
        courses = body['courses']
        course_name= body['courses']['Course_Name']
        responseBody = {}

        
        def func():
             #get seat number from dynamo
            get_Seat_Number = Courses_Seat_No_Table.get_item(Key={'Term_Name': term})
            itemres = get_Seat_Number['Item']
            for x in itemres['Courses']:
                    if(x['Course_Name']==course_name):
                          seatno=int(x['Seat_left'])-1
                          x['Seat_left']=str(seatno)
            
        
            #update seat number
            responseUpdateSeatno = Courses_Seat_No_Table.update_item(
            Key={'Term_Name': term},
            UpdateExpression='SET Courses = :stud_name',
            ExpressionAttributeValues={
                ':stud_name': itemres['Courses']
            }
            )
            
            #get updated seat number from dynamo
            Updated_get_Seat_Number = Courses_Seat_No_Table.get_item(Key={'Term_Name': term})
            itemres = Updated_get_Seat_Number['Item']
            for x in itemres['Courses']:
                    if(x['Course_Name']==course_name):
                          updatedseatno=x['Seat_left']
        
        
        
            #send message to all subscriber
            responseSns=sns.publish(TopicArn='arn:aws:sns:us-east-1:195974574940:NotifyStudent', 
            Message="The Number of seat left for " + course_name + " Course is " + updatedseatno,
            Subject="Course Seat Number Update")
            
            responseBody['responseSns']=responseSns
        
        #get item from dyanamo
        response_Stundet_Courses_Table = Stundet_Courses_Table.get_item(Key={'Student_Email': email_id})
        
        if 'Item' in response_Stundet_Courses_Table:
            itemresStudentCourse = response_Stundet_Courses_Table['Item']
            itemresStudentCourse[term].append(courses)
            print(itemresStudentCourse[term])
        
            #update that item
            udpateQuery=' SET '+ term + ' = :stud_name '
            response = Stundet_Courses_Table.update_item(
            Key={'Student_Email': email_id},
            UpdateExpression=udpateQuery,
            ExpressionAttributeValues={
                ':stud_name': itemresStudentCourse[term]
            }
            )
            
            func()
            
           
        
        else:
            responseDynamo = Stundet_Courses_Table.put_item(
            Item={
                'Student_Email': email_id,
                 term:[courses]
            }
            )
            
            func()
            
            
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