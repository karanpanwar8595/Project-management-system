from django.shortcuts import render
from scheduleeaseapi.models import Profile,Country,State
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import get_connection
import json
import secrets
import string

#Registration
@api_view(['post'])
def registration(request):
        try:
            # Get the posted data from the request body
            data = json.loads(request.body)
            # Access the data (assuming 'username' and 'password' keys in the posted data)
            inputemail = data.get('loginemail')
            inputpassword = generate_random_password(12)
            photo=data.get('photo')
            firstname=data.get('fname')
            middlename=data.get('mname')
            lastname=data.get('lname')
            userrole=data.get('role')
            usergender=data.get('gender')
            dateofbirth=data.get('dob')
            user_status = 1
            profile_status = 1
            city=data.get('city_id')
            print(inputemail)
            logincretentialdata = Profile.objects.get(email=inputemail,password=inputpassword)
            print(logincretentialdata)
            
            if (logincretentialdata):
                dic_login_cretential_data=logincretentialdata.login_to_dict()
                print(dic_login_cretential_data)
                print(dic_login_cretential_data['user_status'])
                if (dic_login_cretential_data['user_status']):
                    return Response({"profile_data": dic_login_cretential_data,"value":True})
            else:
                return Response({"profile_data": False,"value":False})
        except Exception as e:
            print(e)
            return Response({"profile_data": "Internal Error","value":False})


@api_view(['post'])
def country(request):
    try:
        countries = Country.objects.all()
        country_list = [country.to_dict() for country in countries]
        print(country_list)
        return Response({"data":country_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})


@api_view(['post'])
def state(request):
    try:
        data = json.loads(request.body)
        print(request.body)
        user_country_id = data.get('country_id')
        print(user_country_id)
        states = State.objects.filter(country_id=user_country_id)
        state_list = [state.to_dict() for state in states]
        print(state_list)
        return Response({"data":state_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})



# Login Process
@api_view(['post'])
def login(request):
    try:
        # Get the posted data from the request body
        data = json.loads(request.body)
        # Access the data (assuming 'username' and 'password' keys in the posted data)
        inputemail = data.get('loginemail')
        inputpassword = data.get('loginpassword')
        print(inputemail)
        logincretentialdata = Profile.objects.get(email=inputemail,password=inputpassword)
        print(logincretentialdata)
        
        if (logincretentialdata):
            dic_login_cretential_data=logincretentialdata.login_to_dict()
            print(dic_login_cretential_data)
            print(dic_login_cretential_data['user_status'])
            if (dic_login_cretential_data['user_status']):
                return Response({"profile_data": dic_login_cretential_data,"value":True})
        else:
            return Response({"profile_data": False,"value":False})
    except Exception as e:
        print(e)
        return Response({"profile_data": False,"value":False})




# Forgot password process
def generate_random_password(length=12):
    characters = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

def mailsenderapi(inputemail,new_password):
    subject = 'Hello from Django'
    message = 'New password for your login to Schedule Ease website for the account '+inputemail+" is " + new_password
    from_email = "ujjwalbhansal55@gmail.com"
    recipient_list = [inputemail]
    email_settings = {
        'host': 'smtp.gmail.com',
        'port': 587,
        'user': 'ujjwalbhansali55@gmail.com',
        'password': 'ndrn zxki ieqv hywg',
        'use_tls': True,  # Set to True if your email provider requires TLS
    }
    connection = get_connection(
        host=email_settings['host'],
        port=email_settings['port'],
        username=email_settings['user'],
        password=email_settings['password'],
        use_tls=email_settings['use_tls'],
    )
    send_mail(
        subject,
        message,
        from_email,
        recipient_list,
        fail_silently=False,
        auth_user=email_settings['user'],
        auth_password=email_settings['password'],
        connection=connection
    )
@api_view(['post'])
def forgetpassword(request):
    try:
        data = json.loads(request.body)
        inputemail = data.get('forgotpasswordemail')
        user_profile = Profile.objects.get(email = inputemail)
        if (user_profile):
            new_password=generate_random_password(12)
            print("not done")
            mailsenderapi(inputemail,new_password)
            print('done')
            # sql updation 
            condition = {'email':inputemail} 
            profiles_to_update = Profile.objects.filter(**condition)

            # Update the password field for each profile in the queryset
            for profile in profiles_to_update:
                profile.password = new_password
                profile.save()
            return Response({"message":"Password send to Email",'processcompleted':True})
        else:
            return Response({"message":"Email not found" ,'processcompleted':False })

    except Exception as e:
        print(e)
        return Response({"message":"Email not found" ,'processcompleted':False })




# Disscussion process
@api_view(['GET'])
def listofreciver(request):
    return Response([{'firstname' :'Ujjwal', 'email':'jujjwa@gmail.com'},{'firstname' :'Rohit', 'email':'rohit@gmail.com'},{'firstname' :'Ramesh', 'email':'ramesh@gmail.com'},{'firstname' :'Suresh', 'email':'suresh@gmail.com'},])

@api_view(['post'])
def activereciveruser(request):
    return Response([{'firstname' :'Ramesh', 'email':'mudit@gmail.com'}])

# store a single message into the database and send if the message is stored or not
@api_view(['post'])
def messagesendertoreciver(request):
    return Response(True)

# give all the messages related to a perticular person
@api_view(['post'])
def messagesofauser(request):
   
    return Response( [{'sendertype':0,'messagetxt':"how are you",'timestamp':"10:20"},{'sendertype':1,'messagetxt':"i am fine",'timestamp':"10:20"}])

