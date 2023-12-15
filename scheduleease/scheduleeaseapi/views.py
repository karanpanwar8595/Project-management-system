from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
def listofreciver(request):
    return Response([{'firstname' :'ujjwa', 'email':'mudit@gmail.com'},{'firstname' :'ujjwal1', 'email':'mudit@gmail.com'},{'firstname' :'ujjwa', 'email':'mudit@gmail.com'},{'firstname' :'ujjwal', 'email':'mudit@gmail.com'},])

@api_view(['post'])
def activereciveruser(request):
    return Response([{'firstname' :'ujjwaactive', 'email':'mudit@gmail.com'}])

# store a single message into the database and send if the message is stored or not
@api_view(['post'])
def messagesendertoreciver(request):
    return Response(True)

# give all the messages related to a perticular person
@api_view(['post'])
def messagesofauser(request):
   
    return Response( [{'sendertype':0,'messagetxt':"how are you"},{'sendertype':1,'messagetxt':"i am fine"}])

