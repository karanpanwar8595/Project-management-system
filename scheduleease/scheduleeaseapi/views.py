from django.shortcuts import render
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
def listofreciver(request):
    return Response([{'firstname' :'ujjwa', 'email':'mudit@gmail.com'},{'firstname' :'ujjwal1', 'email':'mudit@gmail.com'},{'firstname' :'ujjwa', 'email':'mudit@gmail.com'},{'firstname' :'ujjwal', 'email':'mudit@gmail.com'},])

@api_view(['post'])
def activeuser(request):
    return Response([{'firstname' :'ujjwaactive', 'email':'mudit@gmail.com'}])
